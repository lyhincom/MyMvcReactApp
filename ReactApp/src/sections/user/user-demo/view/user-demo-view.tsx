import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

import { DashboardContent } from 'src/layouts/dashboard';
import { getUsers, type User as ApiUser } from 'src/api/users';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../../table-no-data';
import { emptyRows, getComparator } from '../../utils';
import { TableEmptyRows } from '../../table-empty-rows';
import { UserDemoTableRow } from '../user-demo-table-row';
import { UserDemoTableHead } from '../user-demo-table-head';
import { UserTableToolbar } from '../../user-table-toolbar';

import type { UserProps } from '../../user-table-row';

// ----------------------------------------------------------------------

// Map API user to UserProps format with email
function mapApiUserToUserProps(apiUser: ApiUser): UserProps & { email: string } {
  return {
    id: apiUser.id,
    name: apiUser.name || apiUser.email || 'Unknown',
    email: apiUser.email || '',
    role: 'User',
    status: 'active',
    company: 'Company',
    avatarUrl: apiUser.avatarUrl,
    isVerified: apiUser.isVerified,
  };
}

// Custom filter for email
function applyEmailFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: (UserProps & { email: string })[];
  comparator: any;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  let filtered = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    filtered = filtered.filter((user) =>
      user.email.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return filtered;
}

export function UserDemoView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<(UserProps & { email: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  useEffect(() => {
    let isMounted = true;
    let isCancelled = false;

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching users from API...');
        const apiUsers = await getUsers();
        console.log('Users fetched successfully:', apiUsers);

        // Only update state if component is still mounted and not cancelled
        if (isMounted && !isCancelled) {
          const mappedUsers = apiUsers.map(mapApiUserToUserProps);
          setUsers(mappedUsers);
          setLoading(false);
        } else {
          // If cancelled, still set loading to false
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in fetchUsers:', err);
        // Always set loading to false on error, even if cancelled
        setLoading(false);
        
        // Only update error state if component is still mounted and not cancelled
        if (isMounted && !isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
          setError(errorMessage);
        }
      }
    }

    fetchUsers();

    // Cleanup function to prevent state updates after unmount
    // eslint-disable-next-line consistent-return
    return () => {
      isMounted = false;
      isCancelled = true;
      // Ensure loading is false on cleanup
      setLoading(false);
    };
  }, []);

  const dataFiltered = applyEmailFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Users Demo
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New user
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 400 }}>
              <UserDemoTableHead
                order={table.order}
                orderBy={table.orderBy}
                onSort={table.onSort}
                headLabel={[
                  { id: 'email', label: 'Email' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 10 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 10 }}>
                      <Typography color="error">{error}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row) => (
                        <UserDemoTableRow key={row.id} row={row} />
                      ))}

                    <TableEmptyRows
                      height={68}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                    />

                    {notFound && <TableNoData searchQuery={filterName} />}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('email');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    rowsPerPage,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}


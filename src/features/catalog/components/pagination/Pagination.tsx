import { Link, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import './Pagination.scss';
type Props = {
  total: number;
};

export const Paginator = ({ total }: Props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  return (
    <Pagination
      className="pagination"
      page={page}
      count={Math.ceil(total / 12)}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

// export default function PaginationLink() {
//   return (
//     <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
//       <Routes>
//         <Route path="*" element={<Content />} />
//       </Routes>
//     </MemoryRouter>
//   );
// }

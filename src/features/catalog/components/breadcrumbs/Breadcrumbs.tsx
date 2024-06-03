import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useParams, Link as RouterLink } from 'react-router-dom';
import './Breadcrumbs.scss';

export function BasicBreadcrumbs() {
  const { id, subId } = useParams();

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="link-text" component={RouterLink} to="/catalog">
          Catalog
        </Link>

        {id && (
          <Link
            className="link-text"
            component={RouterLink}
            to={`/catalog/category/${id}`}
          >
            {`${id}`}
          </Link>
        )}

        {subId && <Typography color="text.primary">{`${subId}`}</Typography>}
      </Breadcrumbs>
    </div>
  );
}

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useParams } from 'react-router-dom';

function handleClick() {
  console.info('You clicked a breadcrumb.');
}

export function BasicBreadcrumbs() {
  const { id, subId } = useParams();

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/catalog">
          Catalog
        </Link>

        {id && (
          <Link
            underline="hover"
            color="inherit"
            href={`/catalog/category/${id}`}
          >
            {`${id}`}
          </Link>
        )}

        {subId && <Typography color="text.primary">{`${subId}`}</Typography>}
      </Breadcrumbs>
    </div>
  );
}

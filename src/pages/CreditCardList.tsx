import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@material-ui/core";

type CreditCardListProps = {
  reLoad: boolean;
}

export const CreditCardList = ({reLoad}: CreditCardListProps) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,

    },
    {
      field: 'cardNumber',
      headerName: 'Card Number',
      flex: 2,

    },
    {
      field: 'balance',
      headerName: 'Balance',
      flex: 1.5,
    },
    {
      field: 'cardLimit',
      headerName: 'Limit',
      flex: 1,
    },
  ];

  useEffect(() => {
    (() => {
      fetch("http://localhost:9091/v1/cards").then(async (d) => {
        const result = await d.json();
        setData(result);
      });
    })();
  }, [reLoad]);

  return (
    <Box style={{ height: 400, width: '100%', marginTop:'5%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

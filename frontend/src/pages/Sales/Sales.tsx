import { useState, useEffect, useContext, cloneElement } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import { LoaderContext } from "../../layout";
import DataTable from "../../components/dataTable/DataGrid";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import {
  DeleteOutline,
  DeleteOutlineOutlined,
  LineAxis,
  PlusOne,
} from "@mui/icons-material";
import Delete from "../../components/buttons/Delete";
import useApiRequests from "../../hooks/useApiRequests";
import { useNavigate } from "react-router-dom";

interface ProductObject {
  id: number;
  name: string;
  sku: string;
  description?: string;
  lastModified: string;
  quantity: number;
  salePrice: number;
  action: any;
  regularPrice: number;
  category: {
    name: string;

    id: number;
  };
}

interface Product {
  id: number;
  name: string;
  sku: string;
  Category: any;
  quantity: number;
  salePrice: number;
  regularPrice: number;
  totalAmount: number;
}

export default function InteractiveList() {
  const { getAllProduct, addBill } = useApiRequests();
  const navigate = useNavigate();
  const [dense, setDense] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchedProduct, setSearchedProducts] = useState("");

  console.log(selectedProducts);
  const isLoad = useContext(LoaderContext);

  useEffect(() => {
    const fetchData = async () => {
      if (dataProduct.length === 0) {
        isLoad?.setLoad(true);
      }
      getAllProduct()
        .then((res) => {
          setDataProduct(res);
          if (res) {
            isLoad?.setLoad(false);
          }
        })
        .catch((error) => {
          isLoad?.setLoad(false);
        });
    };
    fetchData();
  }, []);

  const columns: GridColDef<ProductObject>[] = [
    {
      field: "name",
      headerName: "اﻹسم",
      width: 150,
    },
    {
      field: "sku",
      headerName: "الرمز",
      width: 150,
    },
    {
      field: "category",
      headerName: "فئة",
      width: 100,
      valueGetter: (_, row) => row.category?.name,
    },
    {
      field: "quantity",
      headerName: "الكمية",
      width: 150,

      editable: true,
      type: "number",
    },
    {
      field: "regularPrice",
      headerName: "السعر",
      width: 100,
      editable: true,
      type: "number",
    },

    {
      field: "totalPrice",
      headerName: "السعر الكلي",
      type: "number",
      width: 100,
      valueGetter: (_, row) => {
        return row.quantity * row.regularPrice;
      },
    },
    {
      field: "action",
      headerName: "حذف",
      width: 150,
      type: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          color="inherit"
          onClick={() => handelDeleteProduct(row.id)}
        />,
      ],
    },
    // {
    //     field: "costPrice",
    //     headerName: "سعر الكلفة",
    //     width: 100,
    // },
  ];

  const handleSearchProduct = (
    products: Product[],
    searchedProduct: string
  ): Product[] => {
    const trimmedLowerSearchedInput = searchedProduct.trim().toLowerCase();

    if (trimmedLowerSearchedInput === "") {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(trimmedLowerSearchedInput) ||
        product.sku.toLowerCase().includes(trimmedLowerSearchedInput)
    );
  };

  const handleSelectedProduct = (product: Product) => {
    const productId = product.id;

    setSelectedProducts((oldProducts) => {
      const productIndex = oldProducts.findIndex(
        (existingProduct) => existingProduct.id === productId
      );

      if (productIndex !== -1) {
        const updatedProducts = [...oldProducts];
        const updatedProduct = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity + 1,
          totalAmount:
            (updatedProducts[productIndex].quantity + 1) * product.regularPrice,
        };
        updatedProducts[productIndex] = updatedProduct;
        return updatedProducts;
      } else {
        return [
          ...oldProducts,
          {
            ...product,
            quantity: 1,
            totalAmount: product.regularPrice,
          },
        ];
      }
    });
  };

  function handelDeleteProduct(id: number) {
    setSelectedProducts((oldProducts) =>
      oldProducts.filter((product) => product.id !== id)
    );
  }

  async function handelCashOut() {
    try {
      const response = await addBill(selectedProducts);
      navigate("/transactions/" + response.transaction.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        minHeight: "calc(100vh - 120px)",
        display: " flex",
        gap: "20px",
      }}
    >
      <Grid sx={{ width: "calc(100% - 300px)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
            الفاتورة
          </Typography>
          <Button
            onClick={() => handelCashOut()}
            variant="contained"
            sx={{ height: "max-content" }}
          >
            سحب الفاتورة
          </Button>
        </Box>
        <DataTable
          columns={columns}
          rows={selectedProducts}
          onRowEdit={(id, newRow) => {
            setSelectedProducts((oldProducts) =>
              oldProducts.map((product) =>
                product.id === id
                  ? {
                      ...newRow,
                      totalAmount: newRow.quantity * newRow.regularPrice,
                    }
                  : product
              )
            );
          }}
        />
      </Grid>
      <Grid container sx={{ width: "300px" }} spacing={2}>
        <Grid item sx={{ width: "300px" }}>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
            منتجات
          </Typography>

          <TextField
            sx={{ width: "100%" }}
            id="standard-basic"
            label="بحث"
            variant="standard"
            onChange={(e: any) => setSearchedProducts(e.target.value)}
          />

          <List dense={dense}>
            {handleSearchProduct(dataProduct, searchedProduct).map(
              (product: any, index) => (
                <ListItem
                  sx={{ padding: "0" }}
                  onClick={() => handleSelectedProduct(product)}
                >
                  <ListItemText
                    sx={{
                      borderRadius: "3px",
                      paddingY: "2px",
                      paddingInline: "5px",
                      cursor: "pointer",
                      bgcolor: "#ededed",
                    }}
                    primary={product.name}
                    secondary={product.inventoryCount}
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

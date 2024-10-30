"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2, Package, Calendar, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductList: React.FC = () => {
  const {data, isLoading, error } = useGetProductsQuery();
  const [deleteProduct] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating, error: isUpdateError }] =
    useUpdateProductMutation();

  const { productData } = useSelector((state: any) => state.product);

  // Add state for modal and selected product
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(selectedProduct)
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully!"); 
        setIsEditModalOpen(false);
      })
      .catch(() => {
        toast.error(isUpdateError?.message); 
      });
  };

  const handleDelete = (id: number) => {
    deleteProduct({ id })
      .unwrap()
      .then(() => {
        toast.success("Product deleted successfully!"); 
      })
      .catch(() => {
        toast.error("Failed to delete product."); 
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Our Premium Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productData?.map((product: any) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-all hover:shadow-lg flex flex-col h-full"
            >
              <CardHeader className="relative p-0">
                <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Package className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>

              {/* Rest of your existing card content */}
              <CardContent className="flex-grow p-6 flex flex-col">
                <CardTitle className="mb-2 text-2xl">{product.name}</CardTitle>
                <div className="flex justify-between items-center mb-4">
                  <Badge
                    variant="secondary"
                    className="mb-0 w-auto text-center"
                  >
                    {product.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="outline">Stock: {product.quantity}</Badge>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/50 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${product?.creator?.name}`}
                    />
                    <AvatarFallback>
                      {product?.creator?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {product?.creator?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product?.creator?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={selectedProduct?.name || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={selectedProduct?.price || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selectedProduct?.description || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={selectedProduct?.quantity || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductList;

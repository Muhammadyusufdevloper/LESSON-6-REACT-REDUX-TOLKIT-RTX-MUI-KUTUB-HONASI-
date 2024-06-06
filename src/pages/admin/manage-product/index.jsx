import { useState } from "react"
import TransitionsModal from "../../../components/modal"
import SpreadProduct from "../../../components/spread-product"
import { useDeleteProductMutation, useGetProductsQuery } from "../../../context/api/productsApi"
import "./ManageProduct.scss"
const ManageProduct = () => {
    let { data, isLoading } = useGetProductsQuery()
    let [deleteProduct] = useDeleteProductMutation()
    const [update, setUpdate] = useState(null)
    return (
        <>
            <section className="manage-product">
                <div className="manage-product__wrapper admin-container">
                    <h1>Manage Product</h1>
                    {
                        update ?
                            <TransitionsModal setUpdate={setUpdate} data={update} />
                            : <></>
                    }
                    <SpreadProduct data={data} setUpdate={setUpdate} deleteProduct={deleteProduct} isAdmin={true} loading={isLoading} />
                </div>
            </section>
        </>
    )
}

export default ManageProduct
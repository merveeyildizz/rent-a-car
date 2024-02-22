import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddCarForm from "../Forms/Car/AddCarForm";
import UpdateCarForm from "../Forms/Car/UpdateCarForm";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { deleteCar, fetchCars } from "../../store/slices/carSlice";
import { toast } from "react-toastify";

type Props = {};

const CarTable = (props: Props) => {
  const carsState = useSelector((state: any) => state.car);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleToggleUpdateModal = (carId:number) => {
    setSelectedCarId(carId);

    setShowUpdateModal(!showUpdateModal);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  }; 
  const handleDeleteCar = async (id: number) => {
    try {
      await dispatch(deleteCar(id));
      toast.success("Araba başarıyla silindi");
      console.log("Araba silindi");
    } catch (error) {
      console.error("Araba silinemedi", error);
      toast.error("Araba silinemedi");
    }
  };

  return (
    <>
      <table className="table table-hover table-borderless caption-top bg-white rounded mt-2">
        <caption>
          <span className="cars-p">Cars</span> {""}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleToggleAddModal}
          >
            Add New Car
          </button>{" "}
          {""}
        </caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Plate</th>
            <th scope="col">Min. Findeks Rate</th>
            <th scope="col">Color</th>
            <th scope="col">Kilometer</th>
            <th scope="col">Daily Price</th>
            <th scope="col">Model Year</th>
            <th scope="col">Araç Tipi</th>
            <th scope="col">Yakıt Tipi</th>
            <th scope="col">Vites Tipi</th>

          </tr>
        </thead>
        <tbody>
          {carsState.cars.map((car: GetAllCarResponse) => (
            <tr key={car.id}>
              <th scope="row">{car.id}</th>
              <td>{car.model_id && car.model_id.brandResponse ? car.model_id.brandResponse.name : ""}</td>
              <td>{car.model_id && car.model_id.name ? car.color_id.name: ""}</td>
              <td>{car.plate}</td>
              <td>{car.minFindeksRate}</td>
              <td>{car.color_id && car.color_id.name ? car.color_id.name : ""}</td>
              <td>{car.kilometer}</td>
              <td>{car.dailyPrice}</td>
              <td>{car.modelYear}</td>
              <td>{car.carType}</td>
              <td>{car.fuelType}</td>
              <td>{car.transmissionType}</td>

              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-success"  onClick={() => handleToggleUpdateModal(car.id)}
>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showAddModal} onHide={handleToggleAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCarForm />
        </Modal.Body>
       
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateCarForm />
        </Modal.Body>
       
      </Modal>
    </>
  );
};

export default CarTable;

import { useEffect, useState } from "react";
import AdminRepository from "../adminRepository";
import { Button, Typography } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// const items = [
  // {
  //   key: "1",
  //   label: "This is panel header 1",
  //   children: <p>{text}</p>,
  // },
  // {
  //   key: "2",
  //   label: "This is panel header 2",
  //   children: <p>{text}</p>,
  // },
  // {
  //   key: "3",
  //   label: "This is panel header 3",
  //   children: <p>{text}</p>,
  // },
// ];





function useRouteController() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stops, setStops] = useState([])
  const [newRouteData, setNewRouteData] = useState(null);

  function handleDelete(name){
    setLoading(true);
    AdminRepository.deleteRoute(name).then((res) => {
      getRoutes();
    }).catch((err) => {
      alert(err);
      setLoading(false);
    });
  }

  function getRoutes(){
    AdminRepository.getRoutes().then((res) => {
      const temp=[];
      res.map((item) => {
        temp.push({
          key: item.id,
          label: item.name,
          extra: <Button type="secondary" onClick={()=>handleDelete(item.name)}>Delete</Button>,
          children: <div>
            {
              item.stops.map((stop) => {
                return <Typography.Title  level={5}>{stop}</Typography.Title>
              })
            }
          </div>
        });
      });
      setItems(temp);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      alert(err);
    });
  }


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    if(!newRouteData){
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    newRouteData.stops=stops;
    AdminRepository.addRoute(newRouteData).then((res) => {
      console.log(res);
      getRoutes();
      setIsModalOpen(false);
    }).catch((err) => {
      alert(err);
      setLoading(false);
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  }

  function handleAdd(){
    showModal();
  }

  useEffect(() => {
    getRoutes();
  }, []);
  useEffect(() => {
    setStops([])
  }, [isModalOpen]);
  const modalPropeties={showModal, handleOk, handleCancel, isModalOpen}
  return {
    loading,
    items,
    modalPropeties,
    handleAdd,
    stops, setStops,
    newRouteData, setNewRouteData
  };
}

export default useRouteController;

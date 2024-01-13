import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/userContext";
import { Button, Popconfirm } from "antd";
import {
  EditableCell,
  EditableRow,
} from "../../../common/components/tableComponents";
import AdminRepository from "../../admin/adminRepository";
import { useParams } from "react-router-dom";

function useParentController() {
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [routes, setRoutes] = useState([]);
  const { route } = useParams();


  function getRoutes() {
    AdminRepository.getRoutes()
      .then((res) => {
        console.log(res);
        setRoutes(res);
      })
      .catch((err) => {
        alert(err);
      });
  }
  const handleDelete = (key) => {
    setLoading(true);
    console.log(key);
    let data;
    const newData = dataSource.filter((item) => {
      if (item.key === key) {
        data = item;
      }
      return item.key !== key;
    });
    AdminRepository.deleteParent(data.email)
      .then((res) => {
        setDataSource(newData);
        setLoading(false);
      })
      .catch((e) => {
        alert("failed to delete");
        setLoading(false);
      });
  };
  const defaultColumns = [
    {
      title: "Parent Name",
      dataIndex: "parentName",
      // width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Studet Name",
      dataIndex: "studentName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Route",
      dataIndex: "route",
    },
    {
      title: "Send Notification",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Button
            onClick={() => {
              // send message using prompt
              const message = prompt("Enter message");
              // if pressed ok
              console.log(record);
              if (message) {
                AdminRepository.sendFcmNotification(
                  record.token,
                  "Message From Driver",
                  message
                );
              }
            }}
          >
            send
          </Button>
        ) : null,
    },
  ];

  const handleAdd = () => {
    showModal();
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log(newData);
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,

        handleSave,
      }),
    };
  });

function sendAllNotification(){
  const message = prompt("Enter message");
  // if pressed ok
  if (message) {
    dataSource.forEach((item) => {
      AdminRepository.sendFcmNotification(
        item.token,
        "Message From Admin",
        message
      );
    });
  }
}

  useEffect(() => {
    getRoutes();
    AdminRepository.getAllParentsWithRoute(userData.schoolId,route).then((res) => {
      console.log(res);
      const data = res.map((item, index) => {
        return {
          key: index,
          name: item.name,
          email: item.email,
          studentName: item.studentName,
          parentName: item.parentName,
          route: item.route,
          phoneNumber: item.phoneNumber,
          token: item.token,
        };
      });
      setDataSource(data);
      setLoading(false);
    });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // validate
    if (newUserData.email) {
      setLoading(true);
      AdminRepository.addParent(newUserData)
        .then((res) => {
          setDataSource([...dataSource, newUserData]);
          setIsModalOpen(false);
          setNewUserData({});
          setLoading(false);
        })
        .catch((e) => {
          alert("failed to save");
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalPropeties = { showModal, handleOk, handleCancel, isModalOpen };
  return {
    loading,
    handleAdd,
    components,
    dataSource,
    columns,
    defaultColumns,
    setNewUserData,
    modalPropeties,
    routes,
    newUserData,
    sendAllNotification
  };
}

export default useParentController;

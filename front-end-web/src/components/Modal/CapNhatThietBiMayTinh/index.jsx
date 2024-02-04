import {
    Button,
    Checkbox,
    DialogContent,
    DialogTitle,
    Modal,
    ModalClose,
    ModalDialog,
    Sheet,
    Table,
  } from "@mui/joy";
  import ChecklistIcon from "@mui/icons-material/Checklist";
  import style from "./capNhatThietBiMayTinh.module.scss";
  import React, { useEffect, useState } from "react";
  import clsx from "clsx";
  import { getAPI, postAPI } from "../../../api";
  import Swal from "sweetalert2";
  
  export default function CapNhatThietBiMayTinh(props) {
    const [allPhanMem, setAllPhanMem] = useState([]);
    const [selectThietBi, setSelectThietBi] = useState([]);
  
    const handleSelectThietBi = (item) => {
      if (selectThietBi.includes(item)) {
        const update = selectThietBi.filter((i) => i !== item);
        setSelectThietBi(update);
      } else {
        setSelectThietBi([...selectThietBi, item]);
      }
    };
  
    const handleCapNhatThietBiMayTinh = async () => {
      try {
        await selectThietBi?.map(async (item) => {
          const data = {
            mayTinh: { id: props.mayTinhId },
            thietBi: { id: item },
            ngayLapDat: new Date(),
          };
          await postAPI(`/saveChiTietLapDat`, data);
        });
        props.handleGetThietBiLapDat(props.mayTinhId)
        Swal.fire({
          text: "Lắp đặt thiết bị mới vào máy tính thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        setSelectThietBi([])
        props.setOpen(false)
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (props.open) {
        handleAllThietBi();
      }
    }, [props.open]);
    const handleAllThietBi = async () => {
      const result = await getAPI("/getAllThietBi");
      if (result.status === 200) {
        setAllPhanMem(result.data);
      }
    };
  
    return (
      <Modal open={props.open} onClose={() => props.setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>
            <ChecklistIcon sx={{ fontSize: "35px" }} />
            Cập nhật danh sách thiết bị
          </DialogTitle>
          <DialogContent>
            <Sheet className={clsx(style.tableWrap)} id={"scroll-style-01"}>
              <Table stickyHeader hoverRow aria-label="striped table">
                <thead>
                  <tr>
                    <th style={{ width: "20px" }}></th>
                    <th>Tên thiêt bị</th>
                    <th>Số lương</th>
                  </tr>
                </thead>
                <tbody>
                  {allPhanMem?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => handleSelectThietBi(item.id)}
                      >
                        <Checkbox
                          checked={
                            props.thietBiLapDat.some(
                              (i) => i.thietBi.id === item.id
                            ) || selectThietBi.some((i) => i === item.id)
                          }
                          sx={{ marginTop: "40%" }}
                          id={item.id}
                        />
                        <td>{item.tenThietBi}</td>
                        <td>{item.soLuong}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Sheet>
            <Button onClick={() => handleCapNhatThietBiMayTinh()}>
              Cập nhật
            </Button>
          </DialogContent>
        </ModalDialog>
      </Modal>
    );
  }
  
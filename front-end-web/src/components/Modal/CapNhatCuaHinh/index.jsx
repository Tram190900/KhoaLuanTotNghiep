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
import style from "./CapNhatCauHinh.module.scss";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { getAPI, postAPI } from "../../../api";
import Swal from "sweetalert2";

export default function CapNhatCauHinh(props) {
  const [allPhanMem, setAllPhanMem] = useState([]);
  const [allThietBi, setAllThietBi] = useState([]);
  const [selectPhanMem, setSelectPhanMem] = useState([]);
  const [next, setNext] = useState(false);
  const [selectThietBi, setSelectThietBi] = useState([]);

  const handleSelectThietBi = (item) => {
    if (selectThietBi.includes(item)) {
      const update = selectThietBi.filter((i) => i !== item);
      setSelectThietBi(update);
    } else {
      setSelectThietBi([...selectThietBi, item]);
    }
  };

  const handleSelectFriends = (item) => {
    if (selectPhanMem.includes(item)) {
      const update = selectPhanMem.filter((i) => i !== item);
      setSelectPhanMem(update);
    } else {
      setSelectPhanMem([...selectPhanMem, item]);
    }
  };

  const handleCapNhatPhanMemMayTinh = async () => {
    try {
      await selectPhanMem?.map(async (item) => {
        const data = {
          mayTinh: { id: props.mayTinhId },
          phanMem: { id: item },
          ngayCaiDat: new Date(),
        };
        await postAPI(`/saveChiTietCaiDat`, data);
      });
      props.handleGetPhanMemCaiDat(props.mayTinhId);
      Swal.fire({
        text: "Cài đặt phần mềm mới vào máy tính thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSelectPhanMem([]);
      props.setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.open) {
      handleAllPhanMem();
      handleAllThietBi();
    }
  }, [props.open]);
  const handleAllPhanMem = async () => {
    const result = await getAPI("/getAllPhanMem");
    if (result.status === 200) {
      setAllPhanMem(result.data);
    }
  };
  const handleAllThietBi = async () => {
    const result = await getAPI("/getAllThietBi");
    if (result.status === 200) {
      setAllThietBi(result.data);
    }
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>
          <ChecklistIcon sx={{ fontSize: "35px" }} />
          Cập nhật cấu hình máy tính
        </DialogTitle>
        <DialogContent>
          <div className="d-flex w-100">
            <div className={clsx(style.left_menu)}>
              <span className={!next?"font-weight-bold":""}>Phần mềm</span><br/>
              <span className={next?"font-weight-bold":""}>Thiết bị</span>
            </div>
            <div className={clsx(style.table_wrap)}>
              <Sheet
                className={clsx(style.table_phanMem, !next ? style.action : "")}
                id={"scroll-style-01"}
              >
                <Table stickyHeader hoverRow aria-label="striped table">
                  <thead>
                    <tr>
                      <th style={{ width: "20px" }}></th>
                      <th>Tên phần mềm</th>
                      <th>Phiên bản</th>
                      <th>Phát triển bởi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPhanMem?.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => handleSelectFriends(item.id)}
                        >
                          <Checkbox
                            checked={
                              props.phanMemCaiDat.some(
                                (i) => i.phanMem.id === item.id
                              ) || selectPhanMem.some((i) => i === item.id)
                            }
                            sx={{ marginTop: "40%" }}
                            id={item.id}
                          />
                          <td>{item.tenPhamMem}</td>
                          <td>{item.phienBan}</td>
                          <td>{item.phatTrienBoi}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Sheet>
              <Sheet
                className={clsx(style.table_thietBi, next ? style.action : "")}
                id={"scroll-style-01"}
              >
                <Table stickyHeader hoverRow aria-label="striped table">
                  <thead>
                    <tr>
                      <th style={{ width: "20px" }}></th>
                      <th>Tên thiêt bị</th>
                      <th>Số lương</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allThietBi?.map((item, index) => {
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
              <div>
                {!next ? (
                  <Button
                    className="float-right"
                    disabled={selectPhanMem?.length > 0 ? "" : "disabled"}
                    onClick={() => setNext(!next)}
                  >
                    Tiếp tục
                  </Button>
                ) : (
                  <div className={clsx(style.button_thietBi)}>
                    <Button
                      className="float-right"
                      disabled={selectThietBi?.length > 0 ? "" : "disabled"}
                    >
                      Xong
                    </Button>
                    <Button
                      className="float-right"
                      onClick={() => setNext(!next)}
                    >
                      Quay lại
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

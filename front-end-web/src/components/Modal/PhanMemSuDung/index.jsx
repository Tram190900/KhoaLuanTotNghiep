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
import React, { useEffect, useState } from "react";
import ChecklistIcon from "@mui/icons-material/Checklist";
import clsx from "clsx";
import style from "./phanMemSuDung.module.scss";
import { getAPI, putAPI } from "../../../api";
import Swal from "sweetalert2";

export default function PhanMemSuDung(props) {
  const [software, setSoftwares] = useState([]);

  const [selectPhanMem, setSelectPhanMem] = useState([]);

  const loadSoftwares = async () => {
    const result = await getAPI("/getAllPhanMem");
    if (result.status === 200) {
      setSoftwares(result.data);
    }
  };

  useEffect(() => {
    loadSoftwares();
  }, []);

  const handleSelectFriends = (item) => {
    if (selectPhanMem.includes(item)) {
      const update = selectPhanMem.filter((i) => i !== item);
      setSelectPhanMem(update);
    } else {
      setSelectPhanMem([...selectPhanMem, item]);
    }
  };

  const luuPhanMemSuDung = async () => {
    try {
      await putAPI(`/monHocs/softwares/${props.subjectId}`, selectPhanMem);
      Swal.fire({
        text: "Cập nhập phần mềm sử dụng vào môn học thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSelectPhanMem([]);
      props.setOpen(false);
      props.softwares(selectPhanMem);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>
          <ChecklistIcon sx={{ fontSize: "35px" }} />
          Cập nhật danh sách phần mềm
        </DialogTitle>
        <DialogContent>
          <Sheet className={clsx(style.tableWrap)} id={"scroll-style-01"}>
            <Table stickyHeader hoverRow aria-label="striped table">
              <thead>
                <tr>
                  <th style={{ width: "20px" }}></th>
                  <th>Tên phần mềm</th>
                  <th>Phiên bản</th>
                </tr>
              </thead>
              <tbody>
                {software.map((software, index) => (
                  <tr key={index} onClick={() => handleSelectFriends(software)}>
                    <Checkbox
                      checked={selectPhanMem.some((i) => i.id === software.id)}
                      sx={{ marginTop: "40%" }}
                    />
                    <td>{software.tenPhamMem}</td>
                    <td>{software.phienBan}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Button onClick={() => luuPhanMemSuDung()}>Cập nhật</Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

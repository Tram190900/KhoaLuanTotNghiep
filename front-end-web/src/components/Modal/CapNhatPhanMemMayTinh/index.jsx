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
import style from "./capNhatPhanMemMayTinh.module.scss";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { getAPI, postAPI } from "../../../api";
import Swal from "sweetalert2";

export default function CapNhatPhanMemMayTinh(props) {
  const [allPhanMem, setAllPhanMem] = useState([]);
  const [selectPhanMem, setSelectPhanMem] = useState([]);

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
      props.handleGetPhanMemCaiDat(props.mayTinhId)
      Swal.fire({
        text: "Cài đặt phần mềm mới vào máy tính thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSelectPhanMem([])
      props.setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.open) {
      handleAllPhanMem();
    }
  }, [props.open]);
  const handleAllPhanMem = async () => {
    const result = await getAPI("/getAllPhanMem");
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
          <Button onClick={() => handleCapNhatPhanMemMayTinh()}>
            Cập nhật
          </Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

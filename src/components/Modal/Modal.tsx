"use client";

import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { ModalPortal } from "../ModalPortal/ModalPortal";
import { IoMdClose } from "react-icons/io";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <ModalPortal>
      <div
        ref={overlay}
        className="fixed top-0 left-0 flex justify-center items-center z-10 w-screen h-screen px-5 bg-lightBlack"
        onClick={onClick}
      >
        <div
          ref={wrapper}
          className="relative w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-10 bg-white rounded-[15px]"
        >
          <button
            type="button"
            className="absolute top-3 right-3 hover:scale-125 transition-transform duration-300"
          >
            <IoMdClose size={28} onClick={() => onDismiss()} />
          </button>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;

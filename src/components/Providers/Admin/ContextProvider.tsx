"use client";

import { useRouter } from "@/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface ContextMenuState {
  x: number;
  y: number;
  isActive: boolean;
  target: HTMLElement | null;
}

interface ContextMenuProps {
  contextMenu: ContextMenuState;
  setContextMenu: React.Dispatch<React.SetStateAction<ContextMenuState>>;
  editMenu: boolean;
  isLoading: boolean;
  detailMenu: boolean;
  isDeleting: boolean;
  setEditMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
  searchParams : ReadonlyURLSearchParams;
}

const ContextMenu = createContext<ContextMenuProps>({} as ContextMenuProps);

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({} as ContextMenuState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailMenu, setDetailMenu] = useState<boolean>(false);
  const [editMenu, setEditMenu] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams()

  return <ContextMenu.Provider value={{ contextMenu, setContextMenu, isLoading, setIsLoading, detailMenu, setDetailMenu, editMenu, setEditMenu, router, isDeleting, setIsDeleting,searchParams }}>{children}</ContextMenu.Provider>;
}

export function useMenuContextData() {
  return useContext(ContextMenu);
}

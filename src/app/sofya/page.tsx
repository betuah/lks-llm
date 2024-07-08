"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/sidebar";
import { toast } from "sonner";
import ChatContext from "@/context/ChatContext";
import Sofya from "@/components/sofya/chat";

import { ollama_url } from "@/config/env";

const ChatLayout = () => {
   return (
      <Sofya />
   );
};

export default ChatLayout;

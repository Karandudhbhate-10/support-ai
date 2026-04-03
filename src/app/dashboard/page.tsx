import DashboardClient from "@/components/DashboardClient";
import { getSession } from "@/lib/getSession";
import React from "react";

async function page() {
  const session = await getSession();

  return (
    <>
      <DashboardClient ownerID={session?.user?.user?.id!} />
    </>
  );
}

export default page;

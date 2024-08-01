import React from "react";

export default function TeamMember({ params }: { params: { userId: string } }) {
  const { userId } = params;
  return <div>TeamMember: {userId}</div>;
}

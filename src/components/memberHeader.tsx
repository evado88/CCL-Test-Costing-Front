import React from "react";
import { Link, Route } from "react-router-dom";

interface MemberHeaderArgs {
  title: string;
  description: string;
}
export const MemberHeader = ({ title, description}: MemberHeaderArgs) => {
  return (
    /* start title */
    <div className="col-md-12 col-12 b-r">
      <strong>{title}</strong>
      <br />
      <p className="text-muted">{description}</p>
    </div>
  );
};

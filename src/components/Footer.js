import React from "react";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaGithubSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <div className="d-flex justify-content-center mt-5 pt-5">
        <h3 className="underlined">
          Made With <span className="underlined">&#128512</span>
        </h3>
      </div>

      <div className="mt-1 d-flex justify-content-center">
        <a href="https://www.facebook.com/farazahamed.abir">
          <RiFacebookCircleLine size={20} className="ml-4" />
        </a>

        <a href="https://github.com/farazabir">
          <FaGithubSquare size={20} className="ms-4" />
        </a>
      </div>
    </div>
  );
};

export default Footer;

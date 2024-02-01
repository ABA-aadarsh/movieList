import React from 'react'
import { FaGithub } from "react-icons/fa6";
function Footer() {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top px-3">
            <div className="col-md-4 d-flex align-items-center">
                <span className="mb-3 mb-md-0 text-muted">Assignment Project by Aadarsh</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex mx-3">
                <li className="ms-3">
                    <a className="text-muted" href="#">
                        <FaGithub />
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
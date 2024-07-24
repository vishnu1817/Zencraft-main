import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <InputGroup>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
          style={{ flex: 1, minWidth: "420px" }}
        />
        <Button
          variant="outline-success"
          onClick={submitHandler}
          className="ml-2"
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          <i
            className="material-icons"
            style={{ verticalAlign: "middle", color: "black" }}
          >
            search
          </i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;

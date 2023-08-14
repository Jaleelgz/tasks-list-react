import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ContainerLayout from "../components/ContainerLayout/ContainerLayout";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <ContainerLayout loading={loading} title="Home">
      <div>Hello</div>
    </ContainerLayout>
  );
};

export default Home;

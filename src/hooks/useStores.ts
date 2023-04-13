import React from "react";
import {storesContext} from "../store/stores";

export const useStores = () => React.useContext(storesContext)
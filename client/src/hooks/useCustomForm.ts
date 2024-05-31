import { useState, useRef, ChangeEvent, useEffect } from "react";
import goodsStore from "../stores/goods-store";
import { IGood } from "../interfaces/good.interface";
import dayjs from "dayjs";

const useCustomForm = () => {
  const [hasErrors, setHasErrors] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [inputErrors, setInputErrors] = useState<Partial<IGood>>({});

  const [formData, setFormData] = useState<IGood>({
    title: "",
    category_id: 0,
    price: 0,
    manufacturer_id: 0,
    amount: 0,
    characteristic: "",
  });

  const validateForm = (
    selectedDate?: Date | null,
    categoryId?: number,
    goodLoc?: any
  ) => {
    let isValid = true;
    const errors: Partial<IGood> = {};

    setInputErrors(errors);
    setHasErrors(!isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    firstNameRef,
    lastNameRef,
    formData,
    setFormData,
    handleInputChange,
    inputErrors,
  };
};

export default useCustomForm;

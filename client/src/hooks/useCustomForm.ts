import { useState, useRef, ChangeEvent, useEffect } from "react";
import goodsStore from "../stores/goods-store";
import { IGood } from "../interfaces/good.interface";
import dayjs from "dayjs";

const useCustomForm = () => {
  const [hasErrors, setHasErrors] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [inputErrors, setInputErrors] = useState<Partial<IGood>>({
    firstName: "",
    lastName: "",
    hireDate: "",
  });

  const [formData, setFormData] = useState<IGood>({
    firstName: "",
    lastName: "",
    hireDate: null,
    categoryId: null,
    category: {
      title: "",
    },
    location: {
      title: "",
      lat: 0,
      lng: 0,
    },
  });

  const validateForm = (
    selectedDate?: Date | null,
    categoryId?: number,
    goodLoc?: any
  ) => {
    let isValid = true;
    const errors: Partial<IGood> = {};

    if (firstNameRef.current?.value === "") {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (lastNameRef.current?.value === "") {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (selectedDate === null) {
      errors.hireDate = "Hire date is required";
      isValid = false;
    }

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

  const handleFormSubmit = async (
    forWhat: string,
    selectedDate?: Date | null,
    goodId?: number,
    goodLoc?: any,
    posId?: number
  ) => {
    const isValid = validateForm(selectedDate);

    if (!isValid) {
      return;
    }

    const newFormData: IGood = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      hireDate: dayjs(selectedDate).format("DD MMM YYYY"), // Собираем дату с элементов в диалоге
      categoryId: posId || null,
      location: {
        title: goodLoc.loc,
        lng: goodLoc.lng,
        lat: goodLoc.lat,
      },
    };

    setFormData(newFormData);

    forWhat === "add"
      ? goodsStore.addGood(newFormData)
      : goodsStore.updateGood(goodId!, newFormData);
  };

  return {
    firstNameRef,
    lastNameRef,
    formData,
    setFormData,
    handleInputChange,
    inputErrors,
    handleFormSubmit,
    hasErrors,
  };
};

export default useCustomForm;

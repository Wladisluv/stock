import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

import styles from "./CustomDatePicker.module.scss";

interface Props {
  onChange?: (selectedDate: Date | null) => void;
  defaultValue?: Date | null;
  error?: string | undefined;
}

const CustomDatePicker = ({ onChange, defaultValue, error }: Props) => {
  return (
    <div className={styles.datePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker onChange={onChange} defaultValue={defaultValue} />
        {error && (
          <p
            style={{
              fontSize: "0.75rem",
              marginTop: "3px",
              marginLeft: "14px",
              color: "#d32f2f",
            }}
          >
            {error}
          </p>
        )}
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
type Props = {
  callBackFunc: Function;
};

const Header = ({ callBackFunc }: Props) => {
  const [selectValue, setSelectValue] = React.useState<any>();
  const selectRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<any>(null);
  useEffect(() => {
    callBackFunc(() => {
      if (selectRef.current) {
        return selectRef.current?.selectedOptions[0].value;
      }
    });
  }, [selectValue]);

  const submitFunc = (e: any) => {
    e.preventDefault();
    callBackFunc(() => {
      if (searchRef.current) {
        return searchRef.current?.value;
      }
    });
  };

  return (
    <header>
      <div className="container header__container">
        <Link to="/" className="header__logo-box">
          <img
            src="https://cdn.weatherapi.com/weather/64x64/day/116.png"
            alt="logo"
          />
        </Link>
        <form onSubmit={submitFunc}>
          <input
            ref={searchRef}
            placeholder="Search..."
            type="text"
            className="header__search"
          />{" "}
          <button type="submit" style={{ display: "none" }}></button>
        </form>
        <select
          ref={selectRef}
          onChange={(e) => setSelectValue(e)}
          className="header__select"
          name="location"
          id="location_id"
        >
          <option selected value="Tashkent">
            Tashkent
          </option>
          <option value="Karakalpakstan">Karakalpakstan</option>
          <option value="Andijan">Andijan</option>
          <option value="Fergana">Fergana</option>
          <option value="Namangan">Namangan</option>
          <option value="Samarkand">Samarkand</option>
          <option value="Bukhara">Bukhara</option>
          <option value="Khorezm">Khorezm</option>
          <option value="Surxondaryo">Surxondaryo</option>
          <option value="Kashkadarya">Kashkadarya</option>
          <option value="Jizzakh">Jizzakh</option>
          <option value="Syrdarya">Syrdarya</option>
          <option value="Tashkent Region">Tashkent Region</option>
          <option value="Navoiy">Navoiy</option>
        </select>
      </div>
    </header>
  );
};

export default Header;

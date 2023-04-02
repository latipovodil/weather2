import React, { useEffect } from "react";
import { Footer, Header } from "./components";
import "./style/home.scss";
type Props = {};

////////////////// imgs ///////////////////////

import rain from "./assets/rain.svg";
import humidity from "./assets/humidity.svg";
import wind from "./assets/wind.svg";

////////////////// imgs ///////////////////////

import { useState } from "react";
type Location = {
  latitude: number | null | string;
  longitude: number | null | string;
  error: string | null;
};
type Weather = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
  forecast: {
    forecastday: [
      {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
        astro: {
          sunrise: string;
          sunset: string;
          moonrise: string;
          moonset: string;
          moon_phase: string;
          moon_illumination: string;
          is_moon_up: number;
          is_sun_up: number;
        };
      },
      {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      },
      {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      },
      {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      },
      {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      },
      {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      },
      {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }
    ];
  };
};

const Home = (props: Props) => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [weather, setWeather] = useState<Weather | null>(null);

  const [success, setSuccess] = React.useState<any>({
    message: "",
    error: false,
  });

  const locationBrowse = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=1bb3a6c14372406b99473751230204&q=${location.latitude},${location.longitude}&days=7&aqi=no&alerts=no
      `;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.location) {
            setWeather(data);
            setSuccess({
              message: "Muvaffaqqiyatli",
              error: false,
            });
            setTimeout(() => {
              setSuccess({
                message: "",
                error: false,
              });
            }, 8000);
          } else {
            setSuccess({
              message: "Enthernet connectedda prablema",
              error: true,
            });

            setTimeout(() => {
              setSuccess({
                message: "",
                error: true,
              });
            }, 8000);
          }
        });
    } else {
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=1bb3a6c14372406b99473751230204&q=Toshkent&days=7&aqi=no&alerts=no`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.location) {
            setWeather(data);
            setSuccess({
              message: "Muvaffaqqiyatli",
              error: false,
            });
            setTimeout(() => {
              setSuccess({
                message: "",
                error: false,
              });
            }, 8000);
          } else {
            setSuccess({
              message: "Enthernet connectedda prablema",
              error: true,
            });
            setTimeout(() => {
              setSuccess({
                message: "",
                error: true,
              });
            }, 8000);
          }
        });
    }
  }, [location]);

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
    } else {
      window.location.href = window.location.origin + "/login";
    }
  }, []);
  const imgFormatter = (str: string) => {
    let newStr = "https://";
    for (let i = 0; i < str.length; i++) {
      if (i > 1) {
        newStr += str[i];
      }
    }
    return newStr;
  };

  const func = (call: any) => {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=1bb3a6c14372406b99473751230204&q=${call()}&days=7&aqi=no&alerts=no
      `;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.location) {
          setWeather(data);
          setSuccess({
            message: "Muvaffaqqiyatli",
            error: false,
          });
          setTimeout(() => {
            setSuccess({
              message: "",
              error: false,
            });
          }, 8000);
        } else {
          setSuccess({
            message:
              "Yo intiritiz yo'q, yo xato yozdez inputga, yo men viloyat nomini xato yozganman",
            error: true,
          });
          setTimeout(() => {
            setSuccess({
              message: "",
              error: true,
            });
          }, 8000);
        }
      });
  };

  function getMonthName(localtime: string): string {
    const date = new Date(localtime);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    return months[monthIndex];
  }

  interface IWeek {
    date: string;
    time: string;
    dayOfWeek: string;
  }

  function getWeek(localtime: string): IWeek {
    const dateObj = new Date(localtime);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const date = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
    const time = `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    return { date, time, dayOfWeek };
  }

  interface Data2 {
    year: number;
    month: number;
    day: number;
  }

  function timeFunc(str: string): Data2 {
    let year = Number(str[0] + str[1] + str[2] + str[3]);
    let month = Number(str[5] + str[6]);
    let day = Number(str[8] + str[9]);
    return {
      year: year,
      month: month,
      day: day,
    };
  }

  function findAverage(numbers: number[]): number {
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
  }

  function findAverageOfMaxAndMin(max: number, min: number): number {
    const numbers = [max, min];
    return Math.round(findAverage(numbers));
  }

  return (
    <>
      <Header callBackFunc={func} />
      <main>
        {success.message.length > 0 ? (
          success.error ? (
            <div className="error_alert">{success.message}</div>
          ) : (
            <div className="success_alert">{success.message}</div>
          )
        ) : (
          ""
        )}
        <div className="container main__container">
          {weather ? (
            <div className="main__box">
              <h1 className="main__title">
                {weather.location.country}\{weather.location.region}
              </h1>
              <div className="main__current-time-box">
                <div className="main__icon-weather main__icon-weather2">
                  <img
                    src={imgFormatter(weather?.current?.condition.icon)}
                    alt="img"
                  />
                </div>
                <h1 className="main__title2">
                  {weather?.current?.temp_c}
                  <sup>° C</sup>
                </h1>
                <h2 className="main__month-name">
                  {getMonthName(weather?.location?.localtime)}
                  {" " + timeFunc(weather?.location?.localtime).month}
                </h2>
                <div className="main__times-box">
                  <h4 className="main__times">
                    {getWeek(weather?.location?.localtime).dayOfWeek}
                  </h4>

                  <h4 className="main__times">
                    {getWeek(weather?.location?.localtime).time}
                  </h4>
                </div>
                <div className="main__weather-params">
                  <h4>
                    <div>
                      <img src={wind} alt="wind" />
                    </div>
                    <p>{"Wind " + weather?.current?.wind_kph + " km/h"}</p>
                  </h4>
                  <h4>
                    <div>
                      <img src={rain} alt="rain" />
                    </div>
                    <p>{"Rain " + weather?.current?.cloud + " %"}</p>
                  </h4>
                  <h4>
                    <div>
                      <img src={humidity} alt="humidity" />
                    </div>{" "}
                    <p>{"Humidity " + weather?.current?.humidity + " %"}</p>
                  </h4>
                </div>
              </div>

              <ul className="main__week">
                <li className="main__weeks">
                  <h3 className="main__week-title">
                    {Math.round(
                      findAverageOfMaxAndMin(
                        weather?.forecast?.forecastday[0].day.maxtemp_c,
                        weather?.forecast?.forecastday[0].day.mintemp_c
                      )
                    )}{" "}
                    <sup>° C</sup>
                  </h3>
                  <div className="main__icon-weather">
                    <img
                      src={imgFormatter(
                        weather?.forecast?.forecastday[0].day.condition.icon
                      )}
                      alt="img"
                    />
                  </div>
                  <p>
                    {getWeek(weather?.forecast?.forecastday[0].date).dayOfWeek}
                  </p>
                </li>
                <li className="main__weeks">
                  <h3 className="main__week-title">
                    {Math.round(
                      findAverageOfMaxAndMin(
                        weather?.forecast?.forecastday[1].day.maxtemp_c,
                        weather?.forecast?.forecastday[1].day.mintemp_c
                      )
                    )}{" "}
                    <sup>° C</sup>
                  </h3>
                  <div className="main__icon-weather">
                    <img
                      src={imgFormatter(
                        weather?.forecast?.forecastday[1].day.condition.icon
                      )}
                      alt="img"
                    />
                  </div>
                  <p>
                    {getWeek(weather?.forecast?.forecastday[1].date).dayOfWeek}
                  </p>
                </li>
                <li className="main__weeks">
                  <h3 className="main__week-title">
                    {Math.round(
                      findAverageOfMaxAndMin(
                        weather?.forecast?.forecastday[2].day.maxtemp_c,
                        weather?.forecast?.forecastday[2].day.mintemp_c
                      )
                    )}{" "}
                    <sup>° C</sup>
                  </h3>
                  <div className="main__icon-weather">
                    <img
                      src={imgFormatter(
                        weather?.forecast?.forecastday[2].day.condition.icon
                      )}
                      alt="img"
                    />
                  </div>
                  <p>
                    {getWeek(weather?.forecast?.forecastday[2].date).dayOfWeek}
                  </p>
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
// import { Image } from '../../ImageData';
import { API_KEY } from "../../key";
export default function MainContainer() {
  const [selectImage, setSelectImage] = useState([]);

  const [allImage, setallImage] = useState([])
  let onBack = () => {
    if(selectImage.length >1){
        let a = selectImage?.splice(0, selectImage.length - 1);

        console.log(a, "ss");
        setSelectImage(a);
    }
   
  };
  let onNext = () => {
    setSelectImage([...selectImage, allImage[selectImage.length + 1]]);

  };


  const getPhotos = async (type) => {
    let url = `https://api.pexels.com/v1/curated?per_page=100`;



    await fetch(url, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
setallImage(res.photos)
setSelectImage([res.photos[0]])
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);
  return (
    <>
      <div
      // style={{
      //   width: "100%",
      //   height: "auto",
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
      >
        {selectImage?.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: "20%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img width={810} height={400} src={item?.src.medium} alt="all set"></img>
            </div>
          );
        })}
      </div>
      <div>
      <button  onClick= {onBack}>
          BACK
        </button>
        <button onClick={onNext}>NEXT</button>
      </div>
    </>
  );
}

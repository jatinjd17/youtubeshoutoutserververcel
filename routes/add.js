const express = require("express");
const axios = require("axios");
const channel = "./channel.json";
const fs = require("fs");
const { json } = require("body-parser");
const { User } = require("../model/userdetail.js");

const router = express.Router();
const app = express();
var channeldata = [];

router.get("/add/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails%2Cstatistics&id=${id}&key=AIzaSyD3tXcPQGd5mWF8MZLhaHNxWT5X2Ly6GDc`
    );

    const upload =
      data["items"]["0"]["contentDetails"]["relatedPlaylists"]["uploads"];
    console.log(upload);

    const data1 = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${id}&key=AIzaSyD3tXcPQGd5mWF8MZLhaHNxWT5X2Ly6GDc`
      )
      .then((getchanneldata) => {
        //   console.log(getchanneldata.data["items"]);
        return getchanneldata.data["items"];
        this.channeldata = getchanneldata.data["items"];
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(data1[0].snippet.title);

    const data2 = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${upload}&key=AIzaSyD3tXcPQGd5mWF8MZLhaHNxWT5X2Ly6GDc`
      )
      .then((getdata) => {
        //   console.log(getdata.data);
        //   dataa = getdata.data["items"];
        return getdata.data["items"];
      })
      .catch(function (error) {
        console.log("Error while fetching market updates");
      });
    var date = data1[0]?.snippet.publishedAt;
    var createddate = date.split("T")[0];

    const alldata = {
      channelname: data1[0]?.snippet.title,
      channelcreatedate: createddate,
      channelicon: data1[0]?.snippet.thumbnails.default.url,
      channeldescription: data1[0]?.snippet.description,
      viewcount: data1[0]?.statistics.viewCount,
      subcount: data1[0]?.statistics.subscriberCount,
      videocount: data1[0]?.statistics.videoCount,
      videostitle1: data2[0]?.snippet.title,
      videodescription1: data2[0]?.snippet.description,
      videoimage1: data2[0]?.snippet.thumbnails.default.url,
      videostitle2: data2[1]?.snippet.title,
      videodescription2: data2[1]?.snippet.description,
      videoimage2: data2[1]?.snippet.thumbnails.default.url,
      videostitle3: data2[2]?.snippet.title,
      videodescription3: data2[2]?.snippet.description,
      videoimage3: data2[2]?.snippet.thumbnails.default.url,
      videostitle4: data2[3]?.snippet.title,
      videodescription4: data2[3]?.snippet.description,
      videoimage4: data2[3]?.snippet.thumbnails.default.url,
      videostitle5: data2[4]?.snippet.title,
      videodescription5: data2[4]?.snippet.description,
      videoimage5: data2[4]?.snippet.thumbnails.default.url,
    };
    console.log("ssssssssssssssssssssssssssssssssssssssssssss");
    update(alldata, () => {});

    //   console.log({
    //     channelname: data1[0].snippet.title,
    //     channelicon: data1[0].snippet.thumbnails.default.url,
    //     channeldescription: data1[0].snippet.description,
    //     viewcount: data1[0].statistics.viewCount,
    //     subcount: data1[0].statistics.subscriberCount,
    //     videocount: data1[0].statistics.videoCount,
    //     videostitle1: data2[0].snippet.title,
    //     videodescription1: data2[0].snippet.description,
    //     videoimage1: data2[0].snippet.thumbnails.default.url,
    //     videostitle2: data2[1].snippet.title,
    //     videodescription2: data2[1].snippet.description,
    //     videoimage2: data2[1].snippet.thumbnails.default.url,
    //     videostitle3: data2[2].snippet.title,
    //     videodescription3: data2[2].snippet.description,
    //     videoimage3: data2[2].snippet.thumbnails.default.url,
    //     videostitle4: data2[3].snippet.title,
    //     videodescription4: data2[3].snippet.description,
    //     videoimage4: data2[3].snippet.thumbnails.default.url,
    //     videostitle5: data2[4].snippet.title,
    //     videodescription5: data2[4].snippet.description,
    //     videoimage5: data2[4].snippet.thumbnails.default.url,
    //   });
    // console.log("yyyyyy");
    // try {
    //   const createuser = await User.create({
    //     channelname: data1[0].snippet.title,
    //     channelicon: data1[0].snippet.thumbnails.default.url,
    //     channeldescription: data1[0].snippet.description,
    //     viewcount: data1[0].statistics.viewCount,
    //     subcount: data1[0].statistics.subscriberCount,
    //     videocount: data1[0].statistics.videoCount,
    //     videostitle1: data2[0].snippet.title,
    //     videodescription1: data2[0].snippet.description,
    //     videoimage1: data2[0].snippet.thumbnails.default.url,
    //     videostitle2: data2[1].snippet.title,
    //     videodescription2: data2[1].snippet.description,
    //     videoimage2: data2[1].snippet.thumbnails.default.url,
    //     videostitle3: data2[2].snippet.title,
    //     videodescription3: data2[2].snippet.description,
    //     videoimage3: data2[2].snippet.thumbnails.default.url,
    //     videostitle4: data2[3].snippet.title,
    //     videodescription4: data2[3].snippet.description,
    //     videoimage4: data2[3].snippet.thumbnails.default.url,
    //     videostitle5: data2[4].snippet.title,
    //     videodescription5: data2[4].snippet.description,
    //     videoimage5: data2[4].snippet.thumbnails.default.url,
    //   });
    //   console.log("sssss");
    //   res.status(200).json(createuser);
    // } catch (e) {
    //   res.status(400).json(e);
    // }

    //   dataa.map((detail) => {
    //     det.push(detail);
    //   });
    //   console.log(det);

    //   console.log(upload);
    //   console.log(alldata);
    //   res.json({ allldata: alldata });
    //   uploads: upload, data: data,
    //   console.log(dataa);
    //   console.log(channeldata);
    //   console.log(jd);
    res.send("has been successfully added on the wall");
  } catch (e) {
    res.send(
      "Something went wrong user not been added on the wall. Please try again later. Make Sure you enable ur channel subs public visible "
    );
  }
});
// console.log(channeldata);
function update(users, callback) {
  fs.writeFile(channel, JSON.stringify(users), function (err) {
    if (typeof callback === "function") {
      callback();
    }
    if (err) {
      console.log(err);
    }
  });
}

module.exports = router;

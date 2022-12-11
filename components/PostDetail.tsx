import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../types/global";

const PostDetail = ({
  post,
}: {
  post: Post & { content: { raw: { children: [] } } };
}) => {
  const getContentFragment = (
    index: number,
    text: string,
    obj: {
      bold?: any;
      italic?: any;
      underline?: any;
      href?: any;
      title?: any;
      height?: any;
      width?: any;
      src?: any;
      code?: any;
      children?: any;
      url?: any;
    },
    type?: string
  ) => {
    let modifiedText: any = text;

    if (obj) {
      if (obj?.bold) {
        modifiedText = (
          <span key={index} className="font-semibold">
            {modifiedText}
          </span>
        );
      }

      if (obj?.italic) {
        modifiedText = (
          <span key={index} className="italic">
            {modifiedText}
          </span>
        );
      }

      if (obj?.underline) {
        modifiedText = <u key={index}>{modifiedText}</u>;
      }
      if (obj?.href) {
        modifiedText = (
          <a
            key={index}
            href={obj.href}
            className="underline text-blue-900 hover:text-blue-200"
          >
            {modifiedText}
          </a>
        );
      }
      if (obj?.code) {
        modifiedText = <q key={index}>{modifiedText}</q>;
      }
    }
    switch (type) {
      case "heading-one":
        return (
          <h1 key={index} className="text-3xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h1>
        );
      case "heading-two":
        return (
          <h2 key={index} className="text-2xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-lg font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "heading-five":
        return (
          <h5 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h5>
        );
      case "heading-six":
        return (
          <h6 key={index} className="text-sm font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h6>
        );
      case "block-quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-200 p-2 pl-6 text-sm mb-4"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </blockquote>
        );
      case "code-block":
        return (
          <p
            key={index}
            className="mb-4 bg-gray-100 p-4 text-sm font-mono content-start justify-start text-left"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "bulleted-list":
        return (
          <div key={index} className="mb-2">
            {obj?.children.map((item, ind) => (
              <li key={ind}> {item.children[0].children[0].text} </li>
            ))}
          </div>
        );
      case "iframe":
        return (
          <div className="h-64">
            <iframe
              key={index}
              frameBorder={0}
              width={"100%"}
              height={"100%"}
              className="mb-4"
              allow="accelerometer;encrypted-media;picture-in-picture"
              allowFullScreen
              title={obj?.url}
              src={obj?.url}
            />
          </div>
        );
      case "image":
        return (
          <div>
            <img
              className="mb-4"
              key={index}
              alt={obj.title}
              width={"100%"}
              height={"100%"}
              src={obj.src}
            />
          </div>
        );
      default:
        return modifiedText;
    }
  };
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url}
            alt=""
            className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map(
            (
              typeObj: {
                bold?: any;
                italic?: any;
                underline?: any;
                href?: any;
                title?: any;
                height?: any;
                width?: any;
                src?: any;
                children?: [];
                type: any;
              },
              index
            ) => {
              const children: any = typeObj.children.map(
                (
                  item: { href?: any; children?: { text?: any }[]; text?: any },
                  itemindex
                ) => {
                  // console.log(Object.keys(item),"text", item)
                  // console.log("return  ",getContentFragment(itemindex, item.text, item))
                  if (item.href) {
                    // console.log(item.children[0].text)
                    return getContentFragment(
                      itemindex,
                      item.children[0].text,
                      item
                    );
                  }
                  return getContentFragment(itemindex, item.text, item);
                }
              );
              // children.map((item, itemindex) =>
              // {   console.log("Item",item)
              // });
              // console.log(typeObj.type)
              return getContentFragment(index, children, typeObj, typeObj.type);
            }
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetail;

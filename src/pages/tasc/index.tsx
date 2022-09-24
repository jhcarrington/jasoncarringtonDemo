import React from "react";
import { Images } from "../../utils";

export default function Tasc() {
  return (
    <div style={{ textAlign: "left" }}>
      <a target={"_blank"} href={"https://www.tasconline.com/"}>
        <img
          src={Images.TASC}
          style={{ objectFit: "contain", width: "5vw" }}
        ></img>
        <img
          src={Images.MPX}
          style={{ objectFit: "contain", width: "10vw" }}
        ></img>
      </a>
      <div style={{ textAlign: "center", fontSize: 20 }}>TASC & MPX Dev</div>
      <hr></hr>
      <p>
        <i>Total Administrative Services Corporation</i>
        <br />* Software Engineering Internship
      </p>
      <div>
        <b>{"Programming language: "}</b>
        <text>Javascript</text>
        <div></div>
        <b>{"Programming environment: "}</b>
        <text>Angular and AWS Serverless</text>
        <p>
          At TASC Jason worked on a wide variety of things. The code base is on
          the newer side, started 2 years ago, so there was a lot for him to do.
          <br />
          Jason spent the majority of his time working on their backend, which
          controls their Universal Benefits Account. There were a few strange
          bugs that he had to use tools like MYSQLWorkbench and AWS cloud watch
          to debug. The backend also needed new functionality, in which he would
          pair program with a team member to complete. <br />
          Jason also made occasional changes to the admistrator console which
          communicates with the backend. On both front and back end he cleaned
          up code as well as created numerous tests.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              border: "1px solid grey",
              padding: 10,
            }}
          >
            <b>Skills gained</b>
            <p>
              <li>
                Atlassian
                <dd>
                  <li>Bitbucket</li>
                  <li>Jira</li>
                  <li>Confluence</li>
                </dd>{" "}
              </li>

              <li>Writing mysql queries using MSQLWorkbench</li>
              <li>Amazon Web Services</li>
              <li>Debugging a large code base</li>
              <li>Working with a team</li>
              <li>Writing both unit and integration tests</li>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

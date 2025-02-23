import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // State to store selected language

  const [isEditModelShow, setIsEditModelShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const userName = JSON.parse(localStorage.getItem("user")).userData.fullName;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      borderColor: "#555",
      color: "#fff",
      padding: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      color: "#fff",
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#333" : "#000",
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
    }),
  };

  // function to show the language dropdown
  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();
    console.log("data is", data);

    // Filter only the required languages
    const filteredLanguages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "go",
    ];

    const options = data
      .filter((runtime) => filteredLanguages.includes(runtime.language))
      .map((runtime) => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  console.log("Language options:", languageOptions);

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Update selected language state
    console.log("Selected language:", selectedOption);
  };

  const [projects, setProjects] = useState(null);

  // function to get the project of a user
  const getProjects = async () => {
    fetch(api_base_url + "/projects/getprojects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setProjects(data.projects);
        } else {
          toast.error(data.msg);
        }
      });
  };

  console.log("Projects:", projects);

  useEffect(() => {
    getProjects();
    getRunTimes();
  }, []);

  // function to create a project
  const createProj = () => {
    fetch(api_base_url + "/projects/create", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        language: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName("");
          navigate("/editior/" + data.projectId);
        } else {
          toast.error(data.msg);
        }
      });
  };

  // function to delete the project of a user
  const deleteProject = (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/projects/deleteproject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            getProjects();
          } else {
            toast.error(data.msg);
          }
        });
    }
  };

  const [editProjId, setEditProjId] = useState("");
// function to update the project name 
  const updateProj = () => {
    fetch(api_base_url + "/projects//updateproject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsEditModelShow(false);
          setName("");
          setEditProjId("");
          getProjects();
        } else {
          toast.error(data.msg);
          setIsEditModelShow(false);
          setName("");
          setEditProjId("");
          getProjects();
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between mt-5">
        <h3 className="text-2xl">🙋🏼‍♂️ Hi, {userName}</h3>
        <div className="flex items-center">
          <button
            onClick={() => {
              setIsCreateModelShow(true);
            }}
            className="btnNormal bg-blue-500 transition-all hover:bg-blue-600"
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="projects px-[100px] mt-5 pb-10">
        {projects && projects.length > 0
          ? projects.map((project, index) => {
              return (
                <>
                  <div className="project w-full p-[15px] flex items-center justify-between bg-[#0f0e0e]">
                    <div
                      onClick={() => {
                        navigate("/editior/" + project._id);
                      }}
                      className="flex w-full items-center gap-[15px]"
                    >
                      {project.projectLanguage === "python" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png"
                            alt=""
                          />
                        </>
                      ) : project.projectLanguage === "javascript" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projectLanguage === "cpp" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projectLanguage === "c" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projectLanguage === "java" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png"
                            alt=""
                          />
                        </>
                      ) : project.projectLanguage === "go" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                                      src="https://cdn.britannica.com/44/260944-050-7653AA68/go-gopher-go-programming-language-by-google.jpg"
                            alt=""
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <div>
                        <h3 className="text-xl">{project.projectName}</h3>
                        <p className="text-[14px] text-[gray]">
                          {new Date(project.projectDate).toDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-[15px]">
                      <button
                        className="btnNormal bg-blue-500 transition-all hover:bg-blue-600"
                        onClick={() => {
                          setIsEditModelShow(true);
                          setEditProjId(project._id);
                          setName(project.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteProject(project._id);
                        }}
                        className="btnNormal bg-red-500 transition-all hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          : "No Project Found !"}
      </div>

      {isCreateModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsCreateModelShow(false);
              setName("");
            }
          }}
          className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]"
        >
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[25vw] h-[auto] bg-[#0F0E0E]">
            <h3 className="text-xl font-bold text-center">Create Project</h3>
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Enter your project name"
                className="text-black"
              />
            </div>
            <Select
              placeholder="Select a Language"
              options={languageOptions}
              styles={customStyles}
              onChange={handleLanguageChange} // Handle language selection
            />
            {selectedLanguage && (
              <>
                <p className="text-[14px] text-green-500 mt-2">
                  Selected Language: {selectedLanguage.label}
                </p>
                <button
                  onClick={createProj}
                  className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2"
                >
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isEditModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsEditModelShow(false);
              setName("");
            }
          }}
          className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]"
        >
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[25vw] h-[auto] bg-[#0F0E0E]">
            <h3 className="text-xl font-bold text-center">Update Project</h3>
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Enter your project name"
                className="text-black"
              />
            </div>

            <button
              onClick={updateProj}
              className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

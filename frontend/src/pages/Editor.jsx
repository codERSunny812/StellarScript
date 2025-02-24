import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Editor = () => {
  const [code, setCode] = useState(""); //State to hold the code
  const { id } = useParams(); //Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);




  // Fetch project data on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/projects/getproject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (!data.success && data.msg.includes("Rate limit exceeded")) {
          toast.error("API rate limit reached. Try again later.");
          return;
        }

        if (data.success) {
          // console.log("project data:",data)
          setCode(data.project.projectCode); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project function
  const saveProject = () => {
    const trimmedCode = code?.toString().trim(); // Ensure code is a string and trimmed
    console.log('Saving code:', trimmedCode); // Debug log

    fetch(`${import.meta.env.VITE_API_BASE_URL}/projects/saveproject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode, // Use the latest code state
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  };

  // Shortcut handler for saving with Ctrl+S
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault(); // Prevent browser's default save behavior
      saveProject(); // Call the save function
    }
  };

  // Add and clean up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code]); // Reattach when `code` changes

  // Run project function
  const runProject = () => {
    const startTime = performance.now(); // Start time

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: data.projectLanguage,
        version: data.version,
        files: [
          {
            filename: data.projectName +
              (data.projectLanguage === "python" ? ".py" :
                data.projectLanguage === "java" ? ".java" :
                  data.projectLanguage === "javascript" ? ".js" :
                    data.projectLanguage === "c" ? ".c" :
                      data.projectLanguage === "cpp" ? ".cpp" :
                        data.projectLanguage === "go" ? ".go" : ""),
            content: code
          }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        const endTime = performance.now(); // End time
        const executionTime = (endTime - startTime).toFixed(2); // Calculate time in milliseconds

        console.log(`Execution Time: ${executionTime} ms`);
        setOutput(`Execution Time: ${executionTime} ms\n\n${data.run.output}`);
        setError(data.run.code === 1 ? true : false);
        setMemoryUsage(data.run.memory);
        console.log(
          `Memory Usage: ${JSON.stringify(data.run)} KB`
        )
      })

      .catch(err => {
        console.error("Error executing code:", err);
        setOutput("Error executing code.");
      });
  };

  useEffect(() => {
    let idleTimer;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Tab is hidden!");
        toast.warning("You just switched the tabs!");
      }
    };

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        console.log("User is idle!");
        toast.warning("You have been idle for too long!");
      }, 5 * 60 * 1000); // 5 minutes
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);

    resetIdleTimer(); // Start idle timer

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);





  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between" style={{ height: 'calc(100vh - 90px)' }}>
        <div className="left w-[50%] h-full">
          <Editor2
            onChange={(newCode) => {
              console.log('New Code:', newCode); // Debug: Log changes
              setCode(newCode || ''); // Update state
            }}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code} // Bind editor to state
          />
        </div>
        <div className="right p-[15px] w-[50%] h-full bg-[#27272a]">
          <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
            <p className="p-0 m-0">Output</p>
            <button
              className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
              onClick={runProject} // Save when clicking the button
            >
              run
            </button>

          </div>
          <pre className={`w-full h-[75vh] ${error ? "text-red-500" : ""}`} style={{ textWrap: "nowrap" }}>{output}</pre>

          {memoryUsage !== null && (
            <p className="text-gray-400">🖥 Memory Usage: {memoryUsage} KB</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;

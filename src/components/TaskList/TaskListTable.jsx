import React, { useEffect, useState, useMemo } from "react";
import { AlertTriangle, Edit } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TaskListTable({ searchQuery, filters }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArticles = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/article/getarticle`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          localStorage.setItem("dataLength", response.data.length);
        })
        .catch((error) => {
          if (error?.response?.status === 400) {
            window.location.href = "/login";
          }
          setError(error.response?.data || { msg: "Something went wrong!" });
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchArticles();
  }, [token]);

  const handleRedirectPath = (ptsId) => {
    const navigationData = data.filter((item) => item.pts_id === ptsId);
    navigate(`/edit/${ptsId}`, { state: { data: navigationData } });
  };

  // ------------------------------------------------
  // 1. Filter by searchQuery
  // 2. Sort by filters.sortBy
  // ------------------------------------------------
  const filteredData = useMemo(() => {
    // Make a copy of original data
    let filtered = [...data];

    // 1) Search
    if (searchQuery.trim() !== "") {
      const lowerSearch = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        return (
          item.pts_id?.toLowerCase().includes(lowerSearch) ||
          item.em?.toLowerCase().includes(lowerSearch) ||
          item.first_author?.toLowerCase().includes(lowerSearch) ||
          item.corr_author?.toLowerCase().includes(lowerSearch) ||
          item.pit?.toLowerCase().includes(lowerSearch) ||
          item.title?.toLowerCase().includes(lowerSearch)
        );
      });
    }

    // 2) Sort
    if (filters.sortBy === "dueDate") {
      // Sort by S200 field
      filtered.sort((a, b) => {
        const dateA = new Date(a?.event?.sd_published_on_the_web_s200);
        const dateB = new Date(b?.event?.sd_published_on_the_web_s200);
        console.log(a, b);
        return dateB - dateA; // oldest first
      });
    } else if (filters.sortBy === "ptsId") {
      filtered.sort((a, b) => {
        const idA = a.pts_id?.toLowerCase() || "";
        const idB = b.pts_id?.toLowerCase() || "";
        return idB.localeCompare(idA);
      });
    } else if (filters.sortBy === "articleType") {
      // In your original code, article type might come from `row.title` or `row.articleType`.
      // Adjust as needed.
      filtered.sort((a, b) => {
        const typeA = a.title?.toLowerCase() || "";
        const typeB = b.title?.toLowerCase() || "";
        return typeA.localeCompare(typeB);
      });
    }

    return filtered;
  }, [data, searchQuery, filters.sortBy]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              PTS ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              EM
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              First Author
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Corresponding Author
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              PIT
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Article Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Copyediting
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              S200
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 1) Loading State */}
          {loading && (
            <tr>
              <td colSpan="9" className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}

          {/* 2) Error State */}
          {error && (
            <tr>
              <td colSpan="9" className="text-center py-4">
                Error: {error.msg}
              </td>
            </tr>
          )}

          {/* 3) No Data after filtering */}
          {!loading && !error && filteredData.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No articles found!
              </td>
            </tr>
          )}

          {/* 4) Render the Search + Sort results */}
          {!loading &&
            !error &&
            filteredData.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  {row.hasWarning && (
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                  )}
                  {row.pts_id}
                </td>
                <td className="px-4 py-2">{row.em}</td>
                <td className="px-4 py-2">{row.first_author}</td>
                <td className="px-4 py-2">{row.corr_author}</td>
                <td className="px-4 py-2">{row.pit}</td>
                <td className="px-4 py-2">{row.title}</td>
                <td className="px-4 py-2">
                  {row.milestone?.copy_edit_task_complete}
                </td>
                <td className="px-4 py-2">
                  {row.event?.sd_published_on_the_web_s200}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleRedirectPath(row.pts_id)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskListTable;

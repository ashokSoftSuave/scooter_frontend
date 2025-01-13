import React from 'react';

function Notes({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Notes</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">PTS Remarks</label>
          <textarea
            name="pts_remarks"
            value={data.pts_remarks}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Production Notes</label>
          <textarea
            name="production_notes"
            value={data.production_notes}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Notes;


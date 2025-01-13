import React from 'react';
import { format } from 'date-fns';
import { Input } from '../Input';

const Milestone = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      onChange(name, e.target.checked);
    } else if (type === 'date') {
      onChange(name, value ? new Date(value).toISOString() : null);
    } else {
      onChange(name, value);
    }
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy-MM-dd') : '';
  };

  // Group related fields
  const groupFields = (data) => {
    const groups = {
      editingGroup: ['copy_edit_task_complete', 'proofs_to_author', 'au_proof_correx_submitted'],
      approvalGroup: ['cfc_task_complete', 'aiti_task_completed', 'revised_proof_approved'],
    };

    return Object.entries(groups).map(([groupKey, fields]) => ({
      groupKey,
      fields: fields.map(field => ({
        key: field,
        value: data[field]
      })).filter(({ value }) => value !== undefined)
    }));
  };

  const groupedFields = groupFields(data);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-6">Milestone Details</h2>
      
      {/* ID and Revision Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">PTS ID</label>
          <Input
            type="text"
            name="pts_id"
            value={data.pts_id || ''}
            onChange={handleChange}
            placeholder="PTS12345"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Revision Status</label>
          <div className="flex items-center justify-start space-x-2">
            <input
              type="checkbox"
              name="revised_proof_requested"
              checked={data.revised_proof_requested || false}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Revised Proof Requested</span>
          </div>
        </div>
      </div>

      {/* Grouped Fields Sections */}
      {groupedFields.map(({ groupKey, fields }) => (
        <div key={groupKey} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields.map(({ key, value }) => (
            <div key={key} className="space-y-2">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <Input
                type={key.includes('date') || key.includes('At') ? 'date' : 'text'}
                id={key}
                name={key}
                value={key.includes('date') || key.includes('At') ? formatDate(value) : value}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      ))}

      {/* Timestamps Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          <Input
            type="date"
            value={formatDate(data.createdAt)}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Updated At</label>
          <Input
            type="date"
            value={formatDate(data.updatedAt)}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Milestone;


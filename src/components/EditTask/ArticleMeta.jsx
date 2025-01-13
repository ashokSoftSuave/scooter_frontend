import React from 'react';
import { format } from 'date-fns';
import { Input } from "../Input"

const ArticleMeta = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'date') {
      onChange(name, value ? new Date(value).toISOString() : null);
    } else {
      onChange(name, value);
    }
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy-MM-dd') : '';
  };

  const groupFields = (data) => {
    const groups = {
      identifiers: ['pts_id', 'journal', 'pts', 'pit', 'dochead', 'em', 'doi', 'pii', 'url'],
      publication: ['volume', 'issue', 'vol_iss', 'handling_editor', 'production_handler'],
      authors: ['first_author', 'corr_author', 'corr_author_email'],
      dates: ['speed_target', 'on_date', 'embargo_exp', 'article_s300_date', 'item_holdout', 'item_finalizing'],
      misc: ['points', 'pts_remarks', 'production_notes', 'embargo_stg', 'item_group', 'title', 'pts_refers_to'],
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

  const renderInput = (key, value) => {
    const inputProps = {
      id: key,
      name: key,
      value: key.includes('date') || key.includes('exp') ? formatDate(value) : (value || ''),
      onChange: handleChange,
    };

    if (key.includes('date') || key.includes('exp')) {
      inputProps.type = 'date';
    }

    return <Input {...inputProps} />;
  };

  const renderTextarea = (key, value) => {
    return (
      <textarea
        id={key}
        name={key}
        value={value || ''}
        onChange={handleChange}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-6">Article Metadata</h2>
      
      {groupedFields.map(({ groupKey, fields }) => (
        <div key={groupKey} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">{groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fields.map(({ key, value }) => (
              <div key={key} className="space-y-2">
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
                {key === 'points' || key === 'pts_remarks' || key === 'production_notes'
                  ? renderTextarea(key, value)
                  : renderInput(key, value)
                }
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Timestamps Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          {renderInput('createdAt', data.createdAt)}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Updated At</label>
          {renderInput('updatedAt', data.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default ArticleMeta;


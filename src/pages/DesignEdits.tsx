import { useState } from 'react';
import { Upload, Download, Edit3, Search, ZoomIn, ZoomOut, RotateCcw, Grid, MessageSquare, Ruler } from 'lucide-react';
import { mockDesignFiles, getDesignById, formatDate, type DesignFile } from '../data/mockDesigns';

export default function DesignEdits() {
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>('design-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const selectedDesign = selectedDesignId ? getDesignById(selectedDesignId) : null;

  const filteredDesigns = mockDesignFiles.filter(design =>
    design.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25));
  };

  const handleResetView = () => {
    setZoomLevel(100);
  };

  const handleFileSelect = (design: DesignFile) => {
    setSelectedDesignId(design.id);
  };

  return (
    <div className="flex" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Left Panel - Design Files List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Design Files</h2>
            <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
              <Upload className="w-4 h-4 inline mr-1" />
              Upload
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
            />
          </div>
        </div>

        {/* Design Files List */}
        <div className="flex-1 overflow-auto">
          <div className="p-2 space-y-2">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => handleFileSelect(design)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedDesignId === design.id 
                    ? 'bg-green-50 border border-green-200' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={design.thumbnailUrl} 
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {design.filename}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {design.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Modified: {formatDate(design.modifiedAt)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{design.fileSize}</span>
                      {design.annotations.length > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                          {design.annotations.length} annotations
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-1 mt-2">
                  <button className="px-2 py-1 text-xs bg-white border border-gray-200 text-gray-700 rounded hover:bg-gray-50">
                    <Edit3 className="w-3 h-3 inline mr-1" />
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-white border border-gray-200 text-gray-700 rounded hover:bg-gray-50">
                    <Download className="w-3 h-3 inline mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Design Viewer */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedDesign ? (
          <>
            {/* Viewer Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedDesign.filename}</h3>
                  <p className="text-sm text-gray-600">{selectedDesign.title}</p>
                </div>
                
                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-gray-100 rounded-md"
                    disabled={zoomLevel <= 25}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[60px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-gray-100 rounded-md"
                    disabled={zoomLevel >= 200}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetView}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tools Bar */}
            <div className="bg-white border-b border-gray-200 px-4 py-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    showGrid ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-4 h-4 inline mr-1" />
                  Grid
                </button>
                <button className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  Measure
                </button>
                <button
                  onClick={() => setShowAnnotations(!showAnnotations)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    showAnnotations ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Annotations ({selectedDesign.annotations.length})
                </button>
              </div>
            </div>

            {/* Image Viewer */}
            <div className="flex-1 overflow-auto relative">
              <div className="min-h-full flex items-center justify-center p-4">
                <div 
                  className="relative bg-white shadow-lg"
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Grid Overlay */}
                  {showGrid && (
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, #666 1px, transparent 1px),
                          linear-gradient(to bottom, #666 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                      }}
                    />
                  )}
                  
                  {/* Design Image */}
                  <img
                    src={selectedDesign.fileUrl}
                    alt={selectedDesign.title}
                    className="block max-w-none"
                    style={{
                      width: selectedDesign.size.width,
                      height: selectedDesign.size.height
                    }}
                  />

                  {/* Annotations Overlay */}
                  {showAnnotations && selectedDesign.annotations.map((annotation) => (
                    <div
                      key={annotation.id}
                      className="absolute"
                      style={{
                        left: annotation.position.x,
                        top: annotation.position.y,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-blue-700 transition-colors">
                        {annotation.type === 'comment' ? '💬' : '📏'}
                      </div>
                      
                      {/* Annotation Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="font-medium">{annotation.content}</div>
                        <div className="text-gray-300">- {annotation.author}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Panel */}
            {selectedDesign.annotations.length > 0 && (
              <div className="bg-white border-t border-gray-200 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Comments & Annotations</h4>
                <div className="space-y-2 max-h-32 overflow-auto">
                  {selectedDesign.annotations.map((annotation) => (
                    <div key={annotation.id} className="text-sm">
                      <span className="font-medium text-gray-900">• {annotation.content}</span>
                      <span className="text-gray-500 ml-2">- {annotation.author}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                  + Add Comment
                </button>
              </div>
            )}
          </>
        ) : (
          /* No Design Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Edit3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Design File</h3>
              <p className="text-gray-600">Choose a design file from the left panel to view and edit.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

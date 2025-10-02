import React, { useState, useRef } from 'react';
import { InfoBannerConfig } from '../../types';
import { Info, Save, Bold, Italic, Underline } from 'lucide-react';

interface InfoBannerViewProps {
  infoBanner: InfoBannerConfig;
  onUpdateInfoBanner: (config: InfoBannerConfig) => void;
}

const fontFamilies = [
  'Arial',
  'Verdana',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Lucida Console',
];

const InfoBannerView: React.FC<InfoBannerViewProps> = ({ infoBanner, onUpdateInfoBanner }) => {
  const [config, setConfig] = useState<InfoBannerConfig>(infoBanner);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfig(prev => ({ ...prev, text: e.target.value }));
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, backgroundColor: e.target.value }));
  };

  const handleToggleVisibility = () => {
    setConfig(prev => ({ ...prev, isVisible: !prev.isVisible }));
  };

  const applyFormat = (tag: 'strong' | 'em' | 'u') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start === end) return;

    const selectedText = textarea.value.substring(start, end);
    const newText = `${textarea.value.substring(0, start)}<${tag}>${selectedText}</${tag}>${textarea.value.substring(end)}`;
    
    setConfig(prev => ({ ...prev, text: newText }));
  };

  const applyFontFamily = (font: string) => {
    const textarea = textareaRef.current;
    if (!textarea || !font) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) return;

    const selectedText = textarea.value.substring(start, end);
    const newText = `${textarea.value.substring(0, start)}<span style="font-family: '${font}'">${selectedText}</span>${textarea.value.substring(end)}`;

    setConfig(prev => ({ ...prev, text: newText }));
  };

  const handleSave = () => {
    onUpdateInfoBanner(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
        <Info size={24} className="mr-3" />
        Gestion de la Bannière d'Information
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div>
            <label htmlFor="banner-visibility" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="banner-visibility"
                  className="sr-only peer"
                  checked={config.isVisible}
                  onChange={handleToggleVisibility}
                />
                <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-cyan-600 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-full"></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                Afficher la bannière sur le site
              </div>
            </label>
          </div>
          
          <div>
            <label htmlFor="banner-color" className="block text-sm font-medium text-gray-700 mb-2">
              Couleur de fond
            </label>
            <input
              type="color"
              id="banner-color"
              value={config.backgroundColor || '#cffafe'}
              onChange={handleColorChange}
              className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="banner-text" className="block text-sm font-medium text-gray-700 mb-2">
              Contenu de la bannière
            </label>
            <div className="border border-gray-300 rounded-md shadow-sm">
                <div className="flex items-center gap-1 border-b p-2 bg-gray-50 flex-wrap">
                    <button type="button" onClick={() => applyFormat('strong')} title="Gras" className="p-2 rounded hover:bg-gray-200">
                        <Bold size={16} />
                    </button>
                    <button type="button" onClick={() => applyFormat('em')} title="Italique" className="p-2 rounded hover:bg-gray-200">
                        <Italic size={16} />
                    </button>
                    <button type="button" onClick={() => applyFormat('u')} title="Souligné" className="p-2 rounded hover:bg-gray-200">
                        <Underline size={16} />
                    </button>
                    <select
                      onChange={(e) => applyFontFamily(e.target.value)}
                      className="ml-2 p-1.5 border-gray-300 rounded-md text-sm focus:ring-cyan-500 focus:border-cyan-500"
                      title="Police"
                    >
                      <option value="">Police</option>
                      {fontFamilies.map(font => (
                        <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                      ))}
                    </select>
                </div>
                <textarea
                  ref={textareaRef}
                  id="banner-text"
                  rows={10}
                  value={config.text}
                  onChange={handleTextChange}
                  className="w-full p-3 border-0 focus:ring-0 rounded-b-md"
                  placeholder='Écrivez votre message ici et utilisez les boutons pour le mettre en forme.'
                />
            </div>
             <p className="text-xs text-gray-500 mt-2">
              Pour mettre en forme, sélectionnez votre texte puis cliquez sur l'un des boutons ci-dessus.
            </p>
          </div>

          <div>
            <button
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors ${saved ? 'bg-green-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
            >
              <Save size={20} />
              {saved ? 'Enregistré !' : 'Enregistrer les modifications'}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Aperçu en direct</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-200 p-2 text-center text-xs text-gray-500">
              Haut de la page du site
            </div>
            {config.isVisible && (
              <div style={{ backgroundColor: config.backgroundColor || '#cffafe' }} className="text-cyan-800 text-center p-3 text-sm">
                <div dangerouslySetInnerHTML={{ __html: config.text }} />
              </div>
            )}
            <div className={`p-4 ${!config.isVisible ? 'bg-gray-100' : ''}`}>
              <p className="text-gray-400">Contenu de la page...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBannerView;
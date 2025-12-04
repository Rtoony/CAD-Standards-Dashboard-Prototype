
import React, { useState } from 'react';
import { Employee, EmployeeStatus } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { X, Save, User, Briefcase, MapPin, Mail, Phone, AlertCircle, Wrench, Sparkles, Wand2, Loader2, CheckSquare, Square, Bot, Dna, Dice5 } from 'lucide-react';

interface EmployeeFormModalProps {
  mode: 'CREATE' | 'EDIT';
  initialData?: Employee;
  onClose: () => void;
  onSave: (data: Partial<Employee>) => void;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ 
  mode, 
  initialData, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    title: '',
    department: 'Engineering',
    status: 'ACTIVE',
    email: '',
    phone: '',
    location: '',
    skills: [],
    avatarUrl: '',
    ...initialData
  });

  const [skillsInput, setSkillsInput] = useState(initialData?.skills.join(', ') || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Avatar Generator State
  const [showGenerator, setShowGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarPrompt, setAvatarPrompt] = useState("");
  const [autoGenerateIdentity, setAutoGenerateIdentity] = useState(true); // Default to true for better UX
  const [generationStep, setGenerationStep] = useState<string>('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const processedSkills = skillsInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      onSave({
          ...formData,
          skills: processedSkills
      });
    }
  };

  const handleGeneratorToggle = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent form submission
      setShowGenerator(!showGenerator);
  };

  // Helper to ensure clean JSON parsing from LLM response
  const parseGenAIJson = (text: string | undefined) => {
      if (!text) return {};
      let cleaned = text.trim();
      // Remove markdown code blocks if present
      if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '');
      if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```/, '').replace(/```$/, '');
      try {
          return JSON.parse(cleaned);
      } catch (e) {
          console.error("JSON Parse Error:", e);
          return {};
      }
  };

  const handleGenerate = async (isRandom: boolean) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      alert("System Error: API Key missing. Cannot access Personnel Generator.");
      return;
    }

    // Force identity generation if random "Surprise Me" is clicked OR if toggle is on
    const shouldGenerateIdentity = isRandom ? true : autoGenerateIdentity;

    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      let visualDescription = "";
      let updatedFormData = { ...formData };
      
      // --- STEP 1: Generate Text Persona ---
      if (shouldGenerateIdentity) {
          setGenerationStep('Fabricating ACME Identity...');
          
          const textModel = 'gemini-2.5-flash';
          const concept = avatarPrompt || (isRandom ? "A random unique employee with specific quirks" : "A competent employee");
          
          const systemInstruction = `You are the HR AI for ACME Corp, a stylized Engineering/Surveying firm. 
          Generate a personnel record.
          Tone: Professional but with a "Cartoon Universe" logic (like Team Fortress 2 or The Incredibles). 
          The characters should be slightly exaggerated but competent professionals.`;

          const response = await ai.models.generateContent({
             model: textModel,
             contents: `Create a new employee based on this concept: "${concept}".
             
             Requirements:
             1. Name: Creative, fits the universe.
             2. Title: Professional but specific (e.g. "Senior Beam Alignment Tech", "Chief of Mud Logistics").
             3. Department: Must logically match Title.
             4. Skills: 3-4 specific technical or soft skills relevant to the role.
             5. Visuals: Describe them as a 3D cartoon character (specific features, props, expression).
             `,
             config: {
                 systemInstruction: systemInstruction,
                 responseMimeType: "application/json",
                 responseSchema: {
                     type: Type.OBJECT,
                     properties: {
                         name: { type: Type.STRING },
                         title: { type: Type.STRING },
                         department: { type: Type.STRING, enum: ['Engineering', 'Surveying', 'Admin', 'GIS', 'Management'] },
                         email: { type: Type.STRING },
                         phone: { type: Type.STRING },
                         location: { type: Type.STRING },
                         status: { type: Type.STRING, enum: ['ACTIVE', 'FIELD', 'REMOTE', 'LEAVE', 'MEETING'] },
                         skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                         visualDescription: { type: Type.STRING, description: "Visual description for a 3D avatar generator. Focus on physical traits, outfit, and accessories." }
                     },
                     required: ["name", "title", "department", "email", "skills", "visualDescription", "status", "phone", "location"]
                 }
             }
          });

          const persona = parseGenAIJson(response.text);
          
          if (persona.name) {
              updatedFormData = {
                  ...updatedFormData,
                  name: persona.name,
                  title: persona.title,
                  department: persona.department,
                  status: persona.status,
                  email: persona.email.toLowerCase(),
                  phone: persona.phone,
                  location: persona.location,
                  skills: persona.skills || [],
              };
              setFormData(updatedFormData);
              setSkillsInput(persona.skills?.join(', ') || '');
              visualDescription = persona.visualDescription;
          }
      } else {
          setGenerationStep('Analyzing Profile Data...');
          visualDescription = avatarPrompt || `${updatedFormData.title} in ${updatedFormData.department}. Professional appearance.`;
      }

      // --- STEP 2: Generate Avatar Image ---
      setGenerationStep('Rendering Stylized Asset...');

      // Department Theming (The "Universe" Style)
      let deptTheme = "";
      switch(updatedFormData.department) {
          case 'Engineering': deptTheme = "Color Theme: Cobalt Blue & Clean White. Prop: Blueprints, Hard Hat, or Tablet. Vibe: Precise, Tech-savvy."; break;
          case 'Surveying': deptTheme = "Color Theme: Safety Orange & Mud Brown. Prop: Vest, Prism Pole, or GPS. Vibe: Rugged, Outdoorsy."; break;
          case 'Admin': deptTheme = "Color Theme: Gold & Cream. Prop: Headset, Clipboard, or Coffee. Vibe: Organized, Sharp."; break;
          case 'GIS': deptTheme = "Color Theme: Electric Purple & Cyber Green. Prop: AR Glasses, Floating Data. Vibe: Futurist."; break;
          case 'Management': deptTheme = "Color Theme: Silver & Slate Grey. Prop: Suit, Tie, Expensive Watch. Vibe: Commanding."; break;
          default: deptTheme = "Professional office wear";
      }

      // 3D Cartoon Style Prompt
      const finalImagePrompt = `
        Create a 3D Avatar Icon of a company employee.
        
        STYLE GUIDELINES:
        - Art Style: "Stylized 3D Character Design" (References: Overwatch, Valorant, Pixar).
        - Render: High-fidelity, ambient occlusion, soft studio lighting.
        - Texture: Smooth vinyl/clay aesthetic.
        - Background: SOLID COLOR or SIMPLE GRADIENT based on department color. NO complex scenes.
        - Framing: Center-framed bust/portrait looking at camera.
        
        CHARACTER DETAILS:
        ${visualDescription}
        Role: ${updatedFormData.title}
        
        DEPARTMENT THEME (${updatedFormData.department}):
        ${deptTheme}
        
        Constraint: Ensure the character looks like a cohesive set of collectable RPG characters.
      `;

      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: finalImagePrompt }]
        }
      });

      let imageBase64 = null;
      if (imageResponse.candidates?.[0]?.content?.parts) {
        for (const part of imageResponse.candidates[0].content.parts) {
          if (part.inlineData) {
            imageBase64 = part.inlineData.data;
            break;
          }
        }
      }

      if (imageBase64) {
        setFormData(prev => ({ ...prev, ...updatedFormData, avatarUrl: `data:image/png;base64,${imageBase64}` }));
      } else {
        throw new Error("No image data returned from generation service.");
      }

    } catch (error) {
      console.error("Generator failed", error);
      alert("Generator malfunction. Please try again.");
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#18181b] border border-indigo-500/50 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative max-h-[90vh]">
        
        {/* Top Accent */}
        <div className="h-1 w-full bg-emerald-500"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#121212] flex justify-between items-center shrink-0">
          <div>
            <div className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-1">
              HR Data Terminal
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {mode === 'CREATE' ? 'Onboard New Personnel' : 'Update Service Record'}
            </h2>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          
          {/* --- TOP SECTION: AVATAR & IDENTITY --- */}
          <div className="flex gap-6 mb-2">
            
            {/* Left: Avatar Control */}
            <div className="shrink-0">
               <div className="relative group w-24 h-24 rounded bg-neutral-800 border border-white/10 overflow-hidden shadow-inner">
                  {formData.avatarUrl ? (
                      <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">
                          <User size={32} />
                      </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <button 
                        type="button"
                        onClick={handleGeneratorToggle}
                        className="p-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                        title="Open Personnel Generator"
                      >
                         <Wand2 size={14} />
                      </button>
                  </div>

                  {isGenerating && (
                      <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10 p-1 text-center">
                          <Loader2 size={20} className="text-emerald-500 animate-spin mb-1" />
                          <span className="text-[8px] font-mono text-emerald-500 leading-tight">{generationStep}</span>
                      </div>
                  )}
               </div>
               <div className="text-center mt-2">
                  <button 
                    type="button" 
                    onClick={handleGeneratorToggle}
                    className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider flex items-center justify-center gap-1 w-full"
                  >
                     {showGenerator ? 'Close Studio' : 'Open Studio'}
                  </button>
               </div>
            </div>

            {/* Right: Core Identity */}
            <div className="flex-1 space-y-3">
                 {/* ID Display (Read Only) */}
                 {mode === 'EDIT' && (
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Badge ID:</span>
                        <span className="text-xs font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">{initialData?.id}</span>
                    </div>
                )}
                
                <div className="space-y-1">
                    <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Full Name"
                        className={`w-full p-2 bg-[#09090b] border-b-2 text-lg text-white focus:outline-none transition-colors font-bold placeholder:text-neutral-700 ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-emerald-500'}`}
                    />
                     {errors.name && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10}/> {errors.name}</span>}
                </div>
                <div className="space-y-1">
                    <input 
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Job Title"
                        className={`w-full p-2 bg-[#09090b] border-b border-white/10 text-sm text-neutral-300 focus:outline-none transition-colors focus:border-emerald-500 placeholder:text-neutral-700`}
                    />
                    {errors.title && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10}/> {errors.title}</span>}
                </div>
            </div>
          </div>

          {/* --- PERSONNEL GENERATOR PANEL (Expandable) --- */}
          {showGenerator && (
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-md p-4 animate-in slide-in-from-top-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Dna size={48} className="text-indigo-500"/>
                  </div>

                  <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                          <Sparkles size={14} /> Personnel Generator
                      </div>
                      <div className="px-2 py-0.5 bg-indigo-500/20 rounded text-[9px] text-indigo-300 font-mono border border-indigo-500/30">
                          GEMINI-2.5-FLASH
                      </div>
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                      {/* Identity Toggle */}
                      <button 
                        type="button"
                        onClick={() => setAutoGenerateIdentity(!autoGenerateIdentity)}
                        className="flex items-center gap-3 group w-full text-left bg-black/20 p-2 rounded border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className={`transition-colors ${autoGenerateIdentity ? 'text-emerald-500' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
                            {autoGenerateIdentity ? <CheckSquare size={16} /> : <Square size={16} />}
                        </div>
                        <div>
                            <div className={`text-xs font-bold transition-colors ${autoGenerateIdentity ? 'text-white' : 'text-neutral-400'}`}>
                                Generate Full Identity
                            </div>
                            <div className="text-[10px] text-neutral-500 leading-tight">
                                AI will invent Name, Title, Dept, and Skills based on your prompt before creating the avatar.
                            </div>
                        </div>
                      </button>

                      <div className="relative">
                          <div className="absolute left-3 top-3 pointer-events-none opacity-50">
                                <Sparkles size={12} className="text-indigo-300"/>
                          </div>
                          <textarea 
                              value={avatarPrompt}
                              onChange={(e) => setAvatarPrompt(e.target.value)}
                              placeholder={autoGenerateIdentity ? "Role & Temperament (e.g. 'Grumpy senior surveyor who hates computers')..." : "Visual Appearance (e.g. 'Red hair, safety glasses, blue vest')..."}
                              rows={2}
                              className="w-full pl-8 p-3 bg-black/40 border border-white/10 rounded text-xs text-white placeholder:text-neutral-600 focus:border-indigo-500 focus:outline-none resize-none"
                          />
                      </div>
                      
                      <div className="flex gap-2">
                          <button 
                            type="button"
                            onClick={() => handleGenerate(true)}
                            disabled={isGenerating}
                            className="flex-1 py-2 bg-[#18181b] hover:bg-white/5 border border-white/10 rounded text-[10px] font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-center gap-2 transition-colors hover:text-white"
                          >
                              {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Dice5 size={12} />}
                              Surprise Me
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleGenerate(false)}
                            disabled={isGenerating}
                            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/20"
                          >
                              {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Bot size={12} />}
                              Generate
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {/* Department & Status */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                   Department
                </label>
                <select 
                   value={formData.department}
                   onChange={(e) => setFormData({...formData, department: e.target.value as any})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer"
                >
                   <option value="Engineering">Engineering</option>
                   <option value="Surveying">Surveying</option>
                   <option value="Admin">Admin</option>
                   <option value="GIS">GIS</option>
                   <option value="Management">Management</option>
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                   Current Status
                </label>
                <select 
                   value={formData.status}
                   onChange={(e) => setFormData({...formData, status: e.target.value as EmployeeStatus})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer"
                >
                   <option value="ACTIVE">ACTIVE</option>
                   <option value="FIELD">FIELD</option>
                   <option value="REMOTE">REMOTE</option>
                   <option value="LEAVE">LEAVE</option>
                   <option value="MEETING">MEETING</option>
                </select>
             </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                   <Mail size={10} /> Email
                </label>
                <input 
                   type="email"
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                   <Phone size={10} /> Extension/Mobile
                </label>
                <input 
                   type="text"
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
             </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                <MapPin size={10} /> Office / Site Location
             </label>
             <input 
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Office 204 or Site: Hwy 101"
                className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
             />
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                <Wrench size={10} /> Skills / Certifications (Comma separated)
             </label>
             <textarea 
                rows={2}
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="AutoCAD, Civil 3D, Drone Pilot, etc."
                className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none"
             />
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-6 bg-[#121212] border-t border-white/10 flex justify-end gap-3 shrink-0">
           <button 
              onClick={onClose}
              className="px-4 py-2 rounded border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider"
           >
              Cancel
           </button>
           <button 
              onClick={handleSubmit}
              className="px-6 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
           >
              <Save size={14} />
              {mode === 'CREATE' ? 'Add Personnel' : 'Update Record'}
           </button>
        </div>

      </div>
    </div>
  );
};

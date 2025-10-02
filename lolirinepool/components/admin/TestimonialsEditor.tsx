import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { ArrowLeft, Save, MessageCircle, PlusCircle, Edit, Trash2 } from 'lucide-react';

interface TestimonialsEditorProps {
    testimonials: Testimonial[];
    onCreateTestimonial: (testimonialData: Omit<Testimonial, 'id'>) => void;
    onUpdateTestimonial: (updatedTestimonial: Testimonial) => void;
    onDeleteTestimonial: (testimonialId: string) => void;
    onBack: () => void;
}

const TestimonialsEditor: React.FC<TestimonialsEditorProps> = (props) => {
    const { testimonials, onCreateTestimonial, onUpdateTestimonial, onDeleteTestimonial, onBack } = props;
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    
    const [formData, setFormData] = useState({
        quote: '',
        author: '',
        location: '',
        imageUrl: ''
    });

    const handleEditClick = (testimonial: Testimonial) => {
        setIsCreating(false);
        setEditingTestimonial(testimonial);
        setFormData({
            quote: testimonial.quote,
            author: testimonial.author,
            location: testimonial.location,
            imageUrl: testimonial.imageUrl
        });
    };

    const handleCreateClick = () => {
        setEditingTestimonial(null);
        setIsCreating(true);
        setFormData({ quote: '', author: '', location: '', imageUrl: '' });
    };

    const handleCancel = () => {
        setEditingTestimonial(null);
        setIsCreating(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        if (editingTestimonial) {
            onUpdateTestimonial({ ...editingTestimonial, ...formData });
        } else {
            onCreateTestimonial(formData);
        }
        handleCancel();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <button onClick={onBack} className="flex items-center gap-2 text-cyan-600 font-semibold hover:underline">
                    <ArrowLeft size={18} />
                    Retour au CMS
                </button>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <MessageCircle size={22} />
                    Gestion des Témoignages
                </h2>
            </div>
            
            {/* List of Testimonials */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {testimonials.map(t => (
                    <div key={t.id} className="bg-gray-50 p-3 rounded-md border flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{t.author}</p>
                            <p className="text-sm text-gray-600 italic">"{t.quote.substring(0, 50)}..."</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleEditClick(t)} className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-full"><Edit size={16}/></button>
                            <button onClick={() => onDeleteTestimonial(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Editor/Creator Form */}
            {(editingTestimonial || isCreating) && (
                <div className="p-4 border-t mt-4">
                    <h3 className="text-lg font-bold mb-4">{isCreating ? "Ajouter un témoignage" : "Modifier le témoignage"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <textarea name="quote" value={formData.quote} onChange={handleChange} placeholder="Citation" rows={4} className="md:col-span-2 p-2 border rounded-md"/>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Auteur" className="p-2 border rounded-md"/>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Lieu (ex: Bordeaux, France)" className="p-2 border rounded-md"/>
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL de l'image (avatar)" className="md:col-span-2 p-2 border rounded-md"/>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={handleCancel} className="px-4 py-2 text-sm bg-gray-200 rounded-md">Annuler</button>
                        <button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-md">Enregistrer</button>
                    </div>
                </div>
            )}

            <div className="pt-4 border-t flex justify-end">
                 <button
                    onClick={handleCreateClick}
                    className="flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700"
                >
                    <PlusCircle size={18} />
                    Ajouter un témoignage
                </button>
            </div>
        </div>
    );
};

export default TestimonialsEditor;

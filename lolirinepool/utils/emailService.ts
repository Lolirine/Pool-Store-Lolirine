import { EmailTemplate, Notification, Order, CartItem, UserAccount, Address, Supplier } from '../types';
import { formatCurrency } from './formatting';

type PlaceholderData = Omit<Partial<Order> & Partial<UserAccount>, 'shippingAddress'> & {
    shippingAddress?: string | Address;
    supplierName?: string;
    [key: string]: any;
};

export class EmailService {
    private templates: EmailTemplate[];
    private addNotification: (notification: Omit<Notification, 'id'>) => void;

    constructor(templates: EmailTemplate[], addNotification: (notification: Omit<Notification, 'id'>) => void) {
        this.templates = templates;
        this.addNotification = addNotification;
    }

    private replacePlaceholders(text: string, data: PlaceholderData): string {
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            switch (key) {
                case 'customerName':
                    return data.customer || 'Client';
                case 'orderId':
                    return data.id || '';
                case 'orderTotal':
                    return data.total ? formatCurrency(data.total) : '';
                case 'shippingAddress': // Legacy for old templates
                    return `${data.shippingAddress}, ${data.shippingZip} ${data.shippingCity}`;
                case 'customerShippingAddress':
                    return `${data.shippingAddress}<br>${data.shippingZip} ${data.shippingCity}`;
                case 'trackingNumber':
                    return data.trackingNumber || 'N/A';
                case 'resetLink':
                    return '#'; // Simulation link
                case 'cartItemsList':
                     return `<table style="width: 100%; border-collapse: collapse;">
                                ${ (data.items as CartItem[] || []).map(item => 
                                    `<tr style="border-bottom: 1px solid #eee;">
                                        <td style="padding: 10px;">${item.quantity}x ${item.name}</td>
                                        <td style="padding: 10px; text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
                                    </tr>`
                                ).join('')}
                             </table>`;
                case 'supplierName':
                    return data.supplierName || 'Fournisseur';
                case 'invoiceBody':
                    return data.invoiceBody || '<!-- Corps de la facture manquant -->';
                default:
                    return data[key] || match;
            }
        });
    }

    public sendCustomNotification(recipient: string, subject: string, body: string) {
        const notificationBody = `<p>${body.replace(/\n/g, '<br>')}</p>`;
        this.addNotification({
            recipient,
            subject,
            body: notificationBody,
        });
        
        console.log(`--- SIMULATING PUSH NOTIFICATION ---
To: ${recipient}
Subject: ${subject}
--- BODY ---
${body}
--------------------`);
    }

    public send(templateId: string, data: PlaceholderData) {
        const template = this.templates.find(t => t.id === templateId);
        
        if (!template || !template.enabled) {
            console.warn(`Email template "${templateId}" is disabled or does not exist.`);
            return;
        }

        const recipient = data.email || data.customerEmail || 'N/A';
        const subject = this.replacePlaceholders(template.subject, data);
        const body = this.replacePlaceholders(template.body, data);

        this.addNotification({
            recipient,
            subject,
            body
        });
        
        console.log(`--- SIMULATING EMAIL ---
To: ${recipient}
Subject: ${subject}
--- BODY ---
${body.replace(/<[^>]*>?/gm, ' ')} 
--------------------`);
    }
}
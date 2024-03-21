import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser } from '@/lib/actions/users.action';

type EventType = 'user.created' | 'user.deleted' | 'user.updated';

type Event = {
    data: Record<string, string | number | Record<string, string>[]>;
    object: 'event';
    type: EventType;
};

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
        );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400,
        });
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;
    if (eventType === 'user.created') {
        const payload = {
            name: `${evt.data.first_name} ${evt.data.last_name}`,
            mobile: '',
            emergency_number: '',
            email: evt.data.primary_email_address_id,
            bio: '',
            profile_picture: evt.data.has_image ? evt.data.image_url : '',
            bikes: [],
            joined_at: new Date(),
            dob: evt.data.birthday || '',
            is_active: false,
            user_id: evt.data.id,
            socials: {},
            blood_group: '',
            rides_joined: [],
            status: true,
            onboarding: false,
            last_login: evt.data.last_sign_in_at,
        };
        await createUser(payload);
    }
}

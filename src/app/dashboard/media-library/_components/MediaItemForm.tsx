'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { MediaItem, mediaItemSchema, mediaItemTypes } from '@/db/schema';
import { UploadButton } from "@/lib/uploadthing";


export type MediaItemFormValues = z.infer<typeof mediaItemSchema>;

interface MediaItemFormProps {
	initialValues?: Partial<MediaItem>;
	onSubmit: (values: MediaItemFormValues) => void;
	submitButtonText: string;
	isSubmitting: boolean;
}

export function MediaItemForm({
	initialValues,
	onSubmit,
	submitButtonText,
	isSubmitting,
}: MediaItemFormProps) {
	const form = useForm<MediaItemFormValues>({
		resolver: zodResolver(mediaItemSchema),
		defaultValues: {
			id: initialValues?.id,
			title: initialValues?.title || '',
			url: initialValues?.url || '',
			description: initialValues?.description || '',
			type: initialValues?.type || 'general',
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{
					form.getValues('url') !== '' ?  <img src={form.getValues('url')} width={300} height={300} alt='Imagen' /> : <UploadButton
					endpoint="imageUploader"
					onClientUploadComplete={(res) => {
						form.setValue('url', res[0].url)
					}}
					onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
					}}
				/>

				}
				{/* <FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL</FormLabel>
							<FormControl>
								<Input {...field} type='url' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a type' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{mediaItemTypes.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isSubmitting} className='w-full'>
					{isSubmitting ? (
						<>
							<Loader2 className='h-4 w-4 mr-2 animate-spin' />
							Submitting...
						</>
					) : (
						submitButtonText
					)}
				</Button>
			</form>
		</Form>
	);
}

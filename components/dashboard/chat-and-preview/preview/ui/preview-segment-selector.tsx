'use client';
import { FC } from 'react';
import { useAppStore } from '@/lib/store/app.store';
import { For, SegmentGroup, SegmentGroupRootProps } from '@chakra-ui/react';

interface PreviewSegemntSelectorProps extends SegmentGroupRootProps {
	[x: string]: any;
}

export const PreviewSegemntSelector: FC<PreviewSegemntSelectorProps> = ({ ...props }) => {
	const { previewTab, setPreviewTab } = useAppStore((state) => state);
	return (
		<SegmentGroup.Root
			value={previewTab}
			onValueChange={(e) => setPreviewTab(e.value ?? 'Original')}
			rounded={'full'}
			layerStyle={'fill.subtle'}
			colorPalette={'green'}
			size={'sm'}
			{...props}
		>
			<SegmentGroup.Indicator layerStyle={'fill.solid'} colorPalette={'green'} rounded={'full'} />
			<For each={['Original', 'Generated']}>
				{(value) => (
					<SegmentGroup.Item key={value} value={value}>
						<SegmentGroup.ItemText fontWeight={'semibold'} color={{ base: 'green.600', _checked: 'white' }}>
							{value}
						</SegmentGroup.ItemText>
						<SegmentGroup.ItemHiddenInput />
					</SegmentGroup.Item>
				)}
			</For>
		</SegmentGroup.Root>
	);
};

'use client';
import { FC, PropsWithChildren } from 'react';
import { DocumentData } from '@/lib/api';
import { Page, Text, View, Document, StyleSheet, DocumentProps, TextProps, Font } from '@react-pdf/renderer';
import { cleanText } from '@/lib/utils/pdf.utils';

interface PdfRendererProps extends DocumentProps {
	data: DocumentData;
}

const SectionTitle: FC<TextProps & PropsWithChildren> = ({ children, ...props }) => {
	return (
		<View style={styles.sectionTitleContainer}>
			<Text style={styles.sectionTitleText} {...props}>
				{children}
			</Text>
		</View>
	);
};

export const PdfRenderer: FC<PdfRendererProps> = ({ data, ...props }) => {
	Font.register({ family: 'noto-serif', src: '/fonts/noto-serif-regular.ttf', fontWeight: 'normal' });
	Font.register({ family: 'noto-serif', src: '/fonts/noto-serif-bold.ttf', fontWeight: 'bold' });
	return (
		<Document
			title={`${data.basics.name} - Resume`}
			author={`Resumevx`}
			subject={`Resume for ${data.basics.name}`}
			producer="Resumevx"
			language="en-US"
			keywords={data.skills.join(', ')}
			creationDate={new Date()}
			{...props}
		>
			<Page size="A4" orientation="portrait" style={styles.page}>
				<View style={styles.sectionBasic}>
					<Text style={styles.sectionBasicTitle}>{cleanText(data.basics.name)}</Text>
					<View style={styles.sectionBasicInfo}>
						<Text style={styles.sectionBasicInfoText}>{cleanText(data.basics.email)}</Text>
						<Text style={styles.sectionBasicInfoText}>{cleanText(data.basics.phone)}</Text>
						<Text style={styles.sectionBasicInfoText}>{cleanText(data.basics.location)}</Text>
					</View>
				</View>
				<View style={styles.sectionSummary}>
					<SectionTitle>PROFESSIONAL SUMMARY</SectionTitle>
					<View style={styles.sectionListContainer}>
						{data.basics.summary.map((summary, index) => (
							<View key={index} style={styles.sectionListItemContainer}>
								<Text style={styles.sectionListItemBullet}>•</Text>
								<Text key={index} style={styles.sectionListItemText}>
									{cleanText(summary)}
								</Text>
							</View>
						))}
					</View>
				</View>
				<View style={styles.sectionSkills}>
					<SectionTitle>PROFESSIONAL SKILLS</SectionTitle>
					<Text style={styles.sectionSkillsText}>{cleanText(data.skills.join(' - '))}</Text>
				</View>
				<View style={styles.sectionExperience}>
					<SectionTitle>WORK EXPERIENCE</SectionTitle>
					{data.experience.map((experience, index) => (
						<View key={index} style={styles.sectionExperienceItem}>
							<View style={styles.sectionExperienceItemHeader}>
								<View style={styles.sectionExperienceItemHeaderTitle}>
									<Text style={styles.sectionExperienceItemTitle}>{cleanText(experience.role)}</Text>
									<Text style={styles.sectionExperienceItemText}>
										{cleanText(experience.company)}, {cleanText(experience.location)}
									</Text>
								</View>
								<View style={styles.sectionExperienceItemHeaderDates}>
									<Text style={styles.sectionExperienceItemHeaderDate}>{cleanText(experience.startDate)}</Text>
									<Text style={styles.sectionExperienceItemHeaderDate}>{cleanText(experience.endDate)}</Text>
								</View>
							</View>
							<View style={styles.sectionListContainer}>
								{experience.bullets.map((bullet, index) => (
									<View key={index} style={styles.sectionListItemContainer}>
										<Text style={styles.sectionListItemBullet}>•</Text>
										<Text key={index} style={styles.sectionListItemText}>
											{cleanText(bullet)}
										</Text>
									</View>
								))}
							</View>
						</View>
					))}
				</View>
				<View style={styles.sectionEducation}>
					<SectionTitle>EDUCATION</SectionTitle>
					{data.education.map((education, index) => (
						<View key={index} style={styles.sectionEducationItem}>
							<Text style={styles.sectionEducationItemTitle}>{cleanText(education.institution)}</Text>
							<Text style={styles.sectionEducationItemText}>{cleanText(education.degree)}</Text>
							<Text style={styles.sectionEducationItemText}>{cleanText(education.year)}</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	);
};

const styles = StyleSheet.create({
	page: { padding: 24, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', fontFamily: 'noto-serif' },
	sectionBasic: { marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 },
	sectionBasicTitle: { fontSize: 16, fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase' },
	sectionBasicInfo: { display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' },
	sectionBasicInfoText: { fontSize: 12, color: '#333333' },
	sectionSummary: { display: 'flex', flexDirection: 'column', width: '100%', gap: 4 },
	sectionSummaryItem: { display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'flex-start' },
	sectionTitleContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '24px',
		borderTop: '1px solid #e5e7eb',
		borderBottom: '1px solid #e5e7eb',
	},
	sectionTitleText: { fontSize: 12, fontWeight: 'bold', color: '#333333' },
	sectionSummaryText: { fontSize: 11, color: '#333333', display: 'flex', flexWrap: 'wrap', lineHeight: 1.5, textAlign: 'justify' },
	sectionExperience: { width: '100%', gap: 6 },
	sectionExperienceTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#3b82f6',
		height: '24px',
		borderTop: '1px solid #e5e7eb',
		borderBottom: '1px solid #e5e7eb',
	},
	sectionExperienceItem: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 },
	sectionExperienceItemTitle: { fontSize: 12, fontWeight: 'bold', color: '#333333' },
	sectionExperienceItemText: { fontSize: 11, color: '#333333' },
	sectionListContainer: { display: 'flex', flexDirection: 'column', gap: 2 },
	sectionListItemText: { fontSize: 11, color: '#333333', lineHeight: 1.5, textAlign: 'justify', flex: 1 },
	sectionListItemContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 4 },
	sectionListItemBullet: { fontSize: 11, color: '#333333', width: '10px' },
	sectionExperienceItemHeader: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	sectionExperienceItemHeaderTitle: { display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 },
	sectionExperienceItemHeaderDates: { display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' },
	sectionExperienceItemHeaderDate: { fontSize: 11, color: '#333333' },
	sectionEducation: { width: '100%', gap: 6 },
	sectionEducationItem: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 },
	sectionEducationItemTitle: { fontSize: 12, fontWeight: 'bold', color: '#333333' },
	sectionEducationItemText: { fontSize: 11, color: '#333333' },
	sectionSkills: { width: '100%', gap: 6 },
	sectionSkillsText: { fontSize: 11, color: '#333333', display: 'flex', flexWrap: 'wrap', lineHeight: 1.5, textAlign: 'justify' },
});

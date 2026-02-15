import React from 'react';
import { Shield, FileText, DollarSign, AlertTriangle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { azLawSummary } from '../data/researchData';
import InsightCallout from './InsightCallout';

const InfoRow = ({ label, value, icon: Icon, color = 'text-gray-300' }) => (
  <div className="flex items-start gap-3 py-2 border-b border-gray-800/50 last:border-0">
    {Icon && <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />}
    <div className="flex-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-200">{typeof value === 'string' ? value : value}</p>
    </div>
  </div>
);

export default function AZLawESA() {
  const law = azLawSummary;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Arizona Law & ESA Program</h1>
        <p className="text-gray-400 text-sm mt-1">Legal requirements, affidavit process, and Empowerment Scholarship Account details</p>
      </div>

      <InsightCallout color="violet">
        <strong>Arizona has the most homeschool-friendly laws in the nation.</strong> No testing, no reporting, 
        no teacher qualifications — just file a one-time affidavit and teach 5 required subjects. 
        Plus, the universal ESA program provides real funding for every family.
      </InsightCallout>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Homeschool Law */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="text-base font-semibold text-gray-100 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-400" />
            Homeschool Law Summary
          </h3>
          <div className="space-y-0">
            <InfoRow label="Governing Statute" value={law.keyStatute} icon={FileText} color="text-violet-400" />
            <InfoRow label="Compulsory Ages" value={law.compulsoryAges} />
            <InfoRow label="Affidavit Required" value={law.affidavitRequired ? 'Yes — notarized, filed with county superintendent' : 'No'} />
            <InfoRow label="Required Subjects" value={law.requiredSubjects.join(', ')} />
            <InfoRow label="Testing Required" value={law.testingRequired ? 'Yes' : 'No — none required'} icon={law.testingRequired ? AlertTriangle : CheckCircle} color={law.testingRequired ? 'text-red-400' : 'text-emerald-400'} />
            <InfoRow label="Reporting Required" value={law.reportingRequired ? 'Yes' : 'No — none required'} icon={law.reportingRequired ? AlertTriangle : CheckCircle} color={law.reportingRequired ? 'text-red-400' : 'text-emerald-400'} />
            <InfoRow label="Teacher Qualifications" value={law.teacherQualifications} />
            <InfoRow label="Delay Option" value={law.delayOption} />
          </div>
        </div>

        {/* ESA Program */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="text-base font-semibold text-gray-100 mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            ESA Program Details
          </h3>
          <div className="space-y-0">
            <InfoRow label="Program Name" value={law.esaProgram.name} icon={FileText} color="text-emerald-400" />
            <InfoRow label="Average Award" value={law.esaProgram.averageAward} />
            <InfoRow label="Students Enrolled (2025-26)" value={law.esaProgram.enrolled2026} />
            <InfoRow label="Eligibility" value={law.esaProgram.eligibility} />
            <InfoRow label="Disbursement" value={law.esaProgram.disbursement} />
          </div>

          <div className="mt-3 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-400 font-medium mb-2">Allowed Uses</p>
            <div className="flex flex-wrap gap-1.5">
              {law.esaProgram.allowedUses.map((use, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Affidavit Process */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3">Affidavit Filing Process — Maricopa County</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { step: 1, title: "Prepare Affidavit", desc: "Download from AFHE or create your own. Include child's name, DOB, address, and parent info." },
            { step: 2, title: "Get Notarized", desc: "Take the affidavit to a notary public. Many banks and UPS stores offer free/cheap notary services." },
            { step: 3, title: "Submit to County", desc: "Mail or hand-deliver to Maricopa County School Superintendent within 30 days of starting." },
            { step: 4, title: "Keep a Copy", desc: "Make a copy of the notarized affidavit for your records before sending. That's it — you're done!" },
          ].map(s => (
            <div key={s.step} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center">{s.step}</span>
                <p className="text-sm font-medium text-gray-200">{s.title}</p>
              </div>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Warnings */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Important Notes
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">ESA students do NOT file an affidavit</p>
              <p className="text-gray-500 text-xs">If you use the ESA program, you sign a separate contract with ADE. Do not also file an affidavit.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">Public high schools won't accept homeschool credits</p>
              <p className="text-gray-500 text-xs">If your child re-enters public school for high school, they'll be tested for placement. Prior homeschool credits won't transfer toward an accredited diploma.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">Homeschoolers CAN participate in public school sports</p>
              <p className="text-gray-500 text-xs">Per A.R.S. §15-802.01, homeschool students may participate in interscholastic activities at their local public school.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">AzVA is NOT homeschool — it's public school at home</p>
              <p className="text-gray-500 text-xs">Arizona Virtual Academy is a tuition-free charter school. Students follow a school calendar and cannot combine with ESA. True homeschoolers have more freedom.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            { label: "AFHE — AZ Law & Affidavit", url: "https://afhe.org/az-law-and-affidavit" },
            { label: "HSLDA — Arizona Homeschool Laws", url: "https://hslda.org/legal/arizona" },
            { label: "AZ Dept of Education — ESA Program", url: "https://www.azed.gov/esa" },
            { label: "A.R.S. §15-802 (Full Statute)", url: "https://www.azleg.gov/ars/15/00802.htm" },
            { label: "Maricopa County School Superintendent", url: "https://www.maricopa.gov/629/School-Superintendent" },
            { label: "ESA Parent Handbook 2025-26", url: "https://www.azed.gov/sites/default/files/2025/06/ESA%202025-2026%20Handbook.pdf" },
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

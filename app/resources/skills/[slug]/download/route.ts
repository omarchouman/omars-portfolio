import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { getAllSkills, getSkillPackage } from "@/lib/skills";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const skills = getAllSkills();
  return skills.map((s) => ({ slug: s.slug }));
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const pkg = getSkillPackage(slug);
  if (!pkg) return new Response("Not found", { status: 404 });

  const zip = new JSZip();
  for (const file of pkg.files) {
    // Nest under the slug so the archive unzips to <slug>/SKILL.md.
    zip.file(`${slug}/${file}`, fs.readFileSync(path.join(pkg.dir, file)));
  }

  const archive = await zip.generateAsync({ type: "arraybuffer", compression: "DEFLATE" });

  return new Response(archive, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}.skill"`,
      "Content-Length": String(archive.byteLength),
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

import Link from "next/link";

function UpdateId() {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please update your{" "}
        <Link href="/account/profile" className="underline text-accent-500">
          NationalID
        </Link>{" "}
        before making
        <br /> any reservation
      </p>
    </div>
  );
}

export default UpdateId;
